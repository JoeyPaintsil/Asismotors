/**
 * Service to load and parse CSV file for Year/Make/Model data
 * Uses the Copart_make_model_year.csv file from the public folder
 */

// Cache for parsed data
let carDataCache = null;

/**
 * Parse CSV text into array of objects
 * Handles quoted values and commas within quotes
 * @param {string} csvText - CSV file content as text
 * @returns {Array<Object>} Array of objects with column names as keys
 */
const parseCSV = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return [];

  // Parse CSV line handling quoted values
  const parseCSVLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add last field
    result.push(current.trim());
    return result;
  };

  // Parse header row
  const headers = parseCSVLine(lines[0]).map(h => h.replace(/^"|"$/g, ''));
  
  // Parse data rows
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]).map(v => v.replace(/^"|"$/g, ''));
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row);
  }
  
  return data;
};

/**
 * Load and parse the CSV file
 * @returns {Promise<Object>} Parsed car data organized by year -> make -> model
 */
const loadCSVData = async () => {
  if (carDataCache) {
    return carDataCache;
  }

  try {
    // Fetch the CSV file from public folder
    const response = await fetch('/Copart_make_model_year.csv');
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file: ${response.status}`);
    }

    const csvText = await response.text();
    const jsonData = parseCSV(csvText);
    
    // Debug: Log first row to verify column names
    if (jsonData.length > 0) {
      console.log('CSV column names:', Object.keys(jsonData[0]));
      console.log('First row sample:', jsonData[0]);
    }
    
    // Organize data by year -> make -> model
    const organizedData = {};
    
    jsonData.forEach((row) => {
      // Handle case-insensitive column name matching
      const year = String(
        row.model_year || 
        row.MODEL_YEAR || 
        row.Model_Year || 
        row['model_year'] ||
        row['MODEL_YEAR'] ||
        ''
      ).trim();
      const make = String(
        row.make_full_title || 
        row.MAKE_FULL_TITLE || 
        row.Make_Full_Title || 
        row['make_full_title'] ||
        row['MAKE_FULL_TITLE'] ||
        ''
      ).trim();
      const model = String(
        row.vehicle_model || 
        row.VEHICLE_MODEL || 
        row.Vehicle_Model || 
        row['vehicle_model'] ||
        row['VEHICLE_MODEL'] ||
        ''
      ).trim();
      
      if (!year || !make || !model) {
        return; // Skip rows with missing data
      }
      
      if (!organizedData[year]) {
        organizedData[year] = {};
      }
      
      if (!organizedData[year][make]) {
        organizedData[year][make] = new Set();
      }
      
      organizedData[year][make].add(model);
    });
    
    // Convert Sets to Arrays and sort
    Object.keys(organizedData).forEach((year) => {
      Object.keys(organizedData[year]).forEach((make) => {
        organizedData[year][make] = Array.from(organizedData[year][make]).sort();
      });
    });
    
    carDataCache = organizedData;
    return organizedData;
  } catch (error) {
    console.error('Error loading Excel file:', error);
    throw error;
  }
};

/**
 * Get all available years from the CSV data
 * Filters to valid years between 1900 and current year
 * @returns {Promise<string[]>} Array of year strings, sorted descending
 */
export const getYears = async () => {
  const data = await loadCSVData();
  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  
  const years = Object.keys(data)
    .filter(year => {
      const yearNum = parseInt(year);
      return !isNaN(yearNum) && yearNum >= minYear && yearNum <= currentYear;
    })
    .sort((a, b) => parseInt(b) - parseInt(a));
  
  return years;
};

/**
 * Get makes available for a specific year
 * Values wrapped in single quotes come last
 * @param {string} year - The year to filter by
 * @returns {Promise<string[]>} Array of make strings, sorted alphabetically (quoted values last)
 */
export const getMakesByYear = async (year) => {
  const data = await loadCSVData();
  if (!data[year]) {
    return [];
  }
  const makes = Object.keys(data[year]).sort((a, b) => {
    const aQuoted = a.startsWith("'") && a.endsWith("'");
    const bQuoted = b.startsWith("'") && b.endsWith("'");
    
    // If one is quoted and the other isn't, quoted comes last
    if (aQuoted && !bQuoted) return 1;
    if (!aQuoted && bQuoted) return -1;
    
    // Both quoted or both not quoted - sort alphabetically
    return a.localeCompare(b);
  });
  return makes;
};

/**
 * Get models available for a specific year and make
 * Values wrapped in single quotes come last
 * @param {string} year - The year to filter by
 * @param {string} make - The make to filter by
 * @returns {Promise<string[]>} Array of model strings, sorted alphabetically (quoted values last)
 */
export const getModelsByYearAndMake = async (year, make) => {
  const data = await loadCSVData();
  if (!data[year] || !data[year][make]) {
    return [];
  }
  const models = Array.from(data[year][make]).sort((a, b) => {
    const aQuoted = a.startsWith("'") && a.endsWith("'");
    const bQuoted = b.startsWith("'") && b.endsWith("'");
    
    // If one is quoted and the other isn't, quoted comes last
    if (aQuoted && !bQuoted) return 1;
    if (!aQuoted && bQuoted) return -1;
    
    // Both quoted or both not quoted - sort alphabetically
    return a.localeCompare(b);
  });
  return models;
};

