/**
 * TEMPORARY PRICING LOGIC
 * 
 * This file contains temporary pricing calculation logic.
 * DELETE THIS FILE when the API is ready and replace with actual API calls.
 * 
 * The pricing is calculated based on:
 * - Base vehicle value (from vehicle data)
 * - Condition factors (mechanical, exterior, etc.)
 * - Mileage adjustments
 * - Damage deductions
 */

/**
 * Calculate offer price based on form data and vehicle information
 * @param {Object} vehicleData - Vehicle information (year, make, model, etc.)
 * @param {Object} formData - All form responses from the offer flow
 * @returns {number} - Calculated offer price in dollars
 */
export const calculateOfferPrice = (vehicleData, formData) => {
  // Base price calculation (simplified - in real app, this would come from API/database)
  let basePrice = 15000; // Default base price
  
  // Adjust base price based on vehicle year
  if (vehicleData.year) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(vehicleData.year);
    if (age <= 2) {
      basePrice = 25000;
    } else if (age <= 5) {
      basePrice = 18000;
    } else if (age <= 10) {
      basePrice = 12000;
    } else {
      basePrice = 8000;
    }
  }

  // Adjust for luxury brands (example)
  const luxuryBrands = ['Aston Martin', 'Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Lexus', 'Tesla'];
  if (vehicleData.make && luxuryBrands.some(brand => vehicleData.make.includes(brand))) {
    basePrice *= 1.5;
  }

  // Mileage adjustments
  if (formData.odometer && !formData.odometerUnknown) {
    const mileage = parseInt(formData.odometer.replace(/,/g, '')) || 0;
    const mileagePerYear = mileage / Math.max(1, new Date().getFullYear() - (parseInt(vehicleData.year) || 2020));
    
    if (mileagePerYear > 20000) {
      basePrice *= 0.85; // High mileage - 15% reduction
    } else if (mileagePerYear > 15000) {
      basePrice *= 0.92; // Above average - 8% reduction
    } else if (mileagePerYear < 10000) {
      basePrice *= 1.05; // Low mileage - 5% bonus
    }
  } else if (formData.odometerUnknown) {
    basePrice *= 0.90; // Unknown mileage - 10% reduction
  }

  // Mechanical condition adjustments
  const mechanicalMultipliers = {
    'excellent': 1.0,
    'good': 0.95,
    'fair': 0.85,
    'poor': 0.70,
    'not-running': 0.50
  };
  if (formData.mechanical && mechanicalMultipliers[formData.mechanical]) {
    basePrice *= mechanicalMultipliers[formData.mechanical];
  }

  // Exterior damage adjustments
  const damageMultipliers = {
    'none': 1.0,
    'minor': 0.95,
    'moderate': 0.85,
    'major': 0.70,
    'severe': 0.55
  };
  if (formData.exteriorDamage && damageMultipliers[formData.exteriorDamage]) {
    basePrice *= damageMultipliers[formData.exteriorDamage];
  }

  // Wheels and tires adjustments
  if (formData.wheels === 'missing') {
    basePrice -= 500;
  } else if (formData.wheels === 'damaged') {
    basePrice -= 300;
  }

  // Exterior parts adjustments
  if (formData.exteriorParts && formData.exteriorParts.length > 0) {
    const partsDeduction = formData.exteriorParts.length * 200;
    basePrice -= partsDeduction;
  }

  // Lights and glass adjustments
  if (formData.lights === 'damaged') {
    basePrice -= 400;
  }

  // Final details adjustments
  if (formData.finalDetails && formData.finalDetails.length > 0) {
    formData.finalDetails.forEach(detail => {
      if (detail === 'catalytic-converter') {
        basePrice -= 800; // Significant deduction for missing cat
      } else if (detail === 'interior-damage') {
        basePrice -= 300;
      } else if (detail === 'water-fire-damage') {
        basePrice *= 0.60; // Major reduction for water/fire damage
      }
    });
  }

  // Title adjustments
  if (formData.title === 'salvage' || formData.title === 'rebuilt') {
    basePrice *= 0.70;
  } else if (formData.title === 'missing') {
    basePrice *= 0.50;
  }

  // Round to nearest dollar
  return Math.round(basePrice);
};

