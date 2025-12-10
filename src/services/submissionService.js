/**
 * Service to store and retrieve form submissions
 * Uses localStorage for demo purposes
 */

const STORAGE_KEY = 'form_submissions';

/**
 * Save a form submission
 * @param {Object} submission - The submission data
 */
export const saveSubmission = (submission) => {
  try {
    const submissions = getSubmissions();
    const newSubmission = {
      id: Date.now().toString(),
      ...submission,
      status: 'Not Started',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    submissions.push(newSubmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    return newSubmission;
  } catch (error) {
    console.error('Error saving submission:', error);
    throw error;
  }
};

/**
 * Get all submissions
 * @returns {Array} Array of submissions
 */
export const getSubmissions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting submissions:', error);
    return [];
  }
};

/**
 * Update submission status
 * @param {string} id - Submission ID
 * @param {string} status - New status
 */
export const updateSubmissionStatus = (id, status) => {
  try {
    const submissions = getSubmissions();
    const index = submissions.findIndex(s => s.id === id);
    if (index !== -1) {
      submissions[index].status = status;
      submissions[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
      return submissions[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating submission:', error);
    throw error;
  }
};

/**
 * Delete a submission
 * @param {string} id - Submission ID
 */
export const deleteSubmission = (id) => {
  try {
    const submissions = getSubmissions();
    const filtered = submissions.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting submission:', error);
    throw error;
  }
};

/**
 * Initialize demo data if no submissions exist
 */
export const initializeDemoData = () => {
  try {
    const existing = getSubmissions();
    const existingIds = new Set(existing.map(s => s.id));
    
    // If we already have all 12 demo records, don't add more
    if (existingIds.size >= 12) {
      return;
    }
    
    // If we have some records but not all, add the missing ones
    if (existing.length > 0) {
      const missingDemoData = getDemoSubmissions().filter(sub => !existingIds.has(sub.id));
      if (missingDemoData.length > 0) {
        const updated = [...existing, ...missingDemoData];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return;
    }

    const demoSubmissions = getDemoSubmissions();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoSubmissions));
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
};

/**
 * Get all demo submissions data
 */
const getDemoSubmissions = () => {
  return [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        zipcode: '90210',
        status: 'Deal Completed',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          year: '2020',
          makeCode: 'TOYOTA',
          model: 'CAMRY'
        },
        quote: {
          amount: 12500,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'clean_title',
          wheels_tires: 'all_inflated',
          mechanical_condition: 'runs_drives',
          odometer_reading: { mileage: '45000', cannotVerify: false },
          exterior_damage: 'no_damage',
          exterior_parts: 'all_attached',
          lights_glass: 'all_intact',
          final_details: 'none_apply',
          comments: 'Vehicle is in excellent condition, well maintained.'
        }
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '(555) 234-5678',
        zipcode: '10001',
        status: 'Deal Ongoing',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          year: '2018',
          makeCode: 'HONDA',
          model: 'CIVIC'
        },
        quote: {
          amount: 9800,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'salvage_title',
          wheels_tires: 'flat_tires',
          mechanical_condition: 'starts_no_drive',
          odometer_reading: { mileage: '78000', cannotVerify: false },
          exterior_damage: 'has_damage',
          exterior_parts: 'panels_detached',
          lights_glass: 'missing_cracked',
          final_details: 'catalytic_missing',
          comments: 'Vehicle was in an accident, needs repairs.'
        }
      },
      {
        id: '3',
        name: 'Michael Brown',
        email: 'm.brown@email.com',
        phone: '(555) 345-6789',
        zipcode: '33101',
        status: 'Email Sent',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          vin: '1HGBH41JXMN109186'
        },
        quote: {
          amount: 15200,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'clean_title',
          wheels_tires: 'all_inflated',
          mechanical_condition: 'runs_drives',
          odometer_reading: { mileage: '', cannotVerify: true },
          exterior_damage: 'no_damage',
          exterior_parts: 'all_attached',
          lights_glass: 'all_intact',
          final_details: 'none_apply',
          comments: ''
        }
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        phone: '(555) 456-7890',
        zipcode: '60601',
        status: 'Not Started',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          year: '2019',
          makeCode: 'FORD',
          model: 'F-150'
        },
        quote: {
          amount: 18500,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'clean_title',
          wheels_tires: 'all_inflated',
          mechanical_condition: 'runs_drives',
          odometer_reading: { mileage: '62000', cannotVerify: false },
          exterior_damage: 'has_damage',
          exterior_parts: 'all_attached',
          lights_glass: 'all_intact',
          final_details: 'interior_damaged',
          comments: 'Minor scratches on the exterior, interior has some wear.'
        }
      },
      {
        id: '5',
        name: 'David Wilson',
        email: 'd.wilson@email.com',
        phone: '(555) 567-8901',
        zipcode: '75201',
        status: 'Deal Finalized',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          year: '2017',
          makeCode: 'CHEVROLET',
          model: 'SILVERADO'
        },
        quote: {
          amount: 14200,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'clean_title',
          wheels_tires: 'wheels_removed',
          mechanical_condition: 'no_start_no_drive',
          odometer_reading: { mileage: '95000', cannotVerify: false },
          exterior_damage: 'has_damage',
          exterior_parts: 'panels_detached',
          lights_glass: 'missing_cracked',
          final_details: 'water_fire_damage',
          comments: 'Vehicle has significant damage, non-operational.'
        }
      },
      {
        id: '6',
        name: 'Jessica Martinez',
        email: 'j.martinez@email.com',
        phone: '(555) 678-9012',
        zipcode: '90001',
        status: 'Not Started',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          year: '2021',
          makeCode: 'NISSAN',
          model: 'ALTIMA'
        },
        quote: {
          amount: 16800,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'clean_title',
          wheels_tires: 'all_inflated',
          mechanical_condition: 'runs_drives',
          odometer_reading: { mileage: '32000', cannotVerify: false },
          exterior_damage: 'no_damage',
          exterior_parts: 'all_attached',
          lights_glass: 'all_intact',
          final_details: 'none_apply',
          comments: 'Like new condition, single owner.'
        }
      },
      {
        id: '7',
        name: 'Robert Taylor',
        email: 'r.taylor@email.com',
        phone: '(555) 789-0123',
        zipcode: '30301',
        status: 'Email Sent',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          vin: '5YJ3E1EA1KF123456'
        },
        quote: {
          amount: 11200,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'salvage_title',
          wheels_tires: 'flat_tires',
          mechanical_condition: 'starts_no_drive',
          odometer_reading: { mileage: '125000', cannotVerify: false },
          exterior_damage: 'has_damage',
          exterior_parts: 'all_attached',
          lights_glass: 'missing_cracked',
          final_details: 'catalytic_missing',
          comments: 'Front end collision, needs repairs.'
        }
      },
      {
        id: '8',
        name: 'Amanda White',
        email: 'a.white@email.com',
        phone: '(555) 890-1234',
        zipcode: '02101',
        status: 'Deal Ongoing',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          year: '2019',
          makeCode: 'BMW',
          model: '3 SERIES'
        },
        quote: {
          amount: 22400,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'clean_title',
          wheels_tires: 'all_inflated',
          mechanical_condition: 'runs_drives',
          odometer_reading: { mileage: '', cannotVerify: true },
          exterior_damage: 'has_damage',
          exterior_parts: 'all_attached',
          lights_glass: 'all_intact',
          final_details: 'interior_damaged',
          comments: 'Minor scratches, interior needs cleaning.'
        }
      },
      {
        id: '9',
        name: 'Christopher Lee',
        email: 'c.lee@email.com',
        phone: '(555) 901-2345',
        zipcode: '77001',
        status: 'Deal Completed',
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          year: '2016',
          makeCode: 'FORD',
          model: 'MUSTANG'
        },
        quote: {
          amount: 15600,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'clean_title',
          wheels_tires: 'all_inflated',
          mechanical_condition: 'runs_drives',
          odometer_reading: { mileage: '88000', cannotVerify: false },
          exterior_damage: 'no_damage',
          exterior_parts: 'all_attached',
          lights_glass: 'all_intact',
          final_details: 'none_apply',
          comments: 'Well maintained, regular service records available.'
        }
      },
      {
        id: '10',
        name: 'Lauren Anderson',
        email: 'l.anderson@email.com',
        phone: '(555) 012-3456',
        zipcode: '98101',
        status: 'Not Started',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          year: '2020',
          makeCode: 'MAZDA',
          model: 'CX-5'
        },
        quote: {
          amount: 19200,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'clean_title',
          wheels_tires: 'all_inflated',
          mechanical_condition: 'runs_drives',
          odometer_reading: { mileage: '41000', cannotVerify: false },
          exterior_damage: 'no_damage',
          exterior_parts: 'all_attached',
          lights_glass: 'all_intact',
          final_details: 'none_apply',
          comments: ''
        }
      },
      {
        id: '11',
        name: 'Daniel Garcia',
        email: 'd.garcia@email.com',
        phone: '(555) 123-4567',
        zipcode: '80201',
        status: 'Email Sent',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          year: '2018',
          makeCode: 'CHEVROLET',
          model: 'MALIBU'
        },
        quote: {
          amount: 13400,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'clean_title',
          wheels_tires: 'flat_tires',
          mechanical_condition: 'runs_drives',
          odometer_reading: { mileage: '67000', cannotVerify: false },
          exterior_damage: 'has_damage',
          exterior_parts: 'panels_detached',
          lights_glass: 'all_intact',
          final_details: 'interior_damaged',
          comments: 'Needs new tires and minor body work.'
        }
      },
      {
        id: '12',
        name: 'Nicole Thompson',
        email: 'n.thompson@email.com',
        phone: '(555) 234-5678',
        zipcode: '19101',
        status: 'Deal Finalized',
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        vehicleData: {
          vin: '1FTFW1ET5DFC12345'
        },
        quote: {
          amount: 17800,
          currency: 'USD'
        },
        answers: {
          title_ownership: 'clean_title',
          wheels_tires: 'all_inflated',
          mechanical_condition: 'runs_drives',
          odometer_reading: { mileage: '54000', cannotVerify: false },
          exterior_damage: 'no_damage',
          exterior_parts: 'all_attached',
          lights_glass: 'all_intact',
          final_details: 'none_apply',
          comments: 'Excellent condition, garage kept.'
        }
      }
    ];
};

