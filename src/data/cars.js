// Car database structure - ready for Supabase migration
// This will be replaced with Supabase queries later

export const carDatabase = {
  2025: {
    Honda: {
      Civic: {
        Sedan: ['LX', 'EX', 'EX-L', 'Sport', 'Touring'],
        Coupe: ['LX', 'EX', 'Si', 'Type R'],
        Hatchback: ['LX', 'Sport', 'Sport Touring']
      },
      Accord: {
        Sedan: ['LX', 'Sport', 'EX-L', 'Touring', 'Hybrid'],
        Hybrid: ['Sport', 'EX-L', 'Touring']
      },
      CRV: {
        SUV: ['LX', 'EX', 'EX-L', 'Sport', 'Touring', 'Hybrid']
      },
      Pilot: {
        SUV: ['LX', 'EX-L', 'Touring', 'Elite', 'Black Edition']
      }
    },
    Toyota: {
      Camry: {
        Sedan: ['LE', 'SE', 'XLE', 'XSE', 'TRD'],
        Hybrid: ['LE', 'SE', 'XLE', 'XSE']
      },
      Corolla: {
        Sedan: ['L', 'LE', 'SE', 'XLE', 'XSE'],
        Hatchback: ['SE', 'XSE'],
        Hybrid: ['LE', 'SE']
      },
      RAV4: {
        SUV: ['LE', 'XLE', 'XLE Premium', 'Limited', 'Adventure', 'TRD Off-Road', 'Hybrid', 'Prime']
      },
      Highlander: {
        SUV: ['L', 'LE', 'XLE', 'Limited', 'Platinum', 'Hybrid']
      },
      Tundra: {
        Truck: ['SR', 'SR5', 'Limited', 'Platinum', '1794 Edition', 'TRD Pro']
      }
    },
    Ford: {
      'F-150': {
        Truck: ['XL', 'XLT', 'Lariat', 'King Ranch', 'Platinum', 'Limited', 'Raptor', 'Lightning']
      },
      Mustang: {
        Coupe: ['EcoBoost', 'GT', 'Mach 1', 'Shelby GT500'],
        Convertible: ['EcoBoost', 'GT', 'Mach 1']
      },
      Explorer: {
        SUV: ['Base', 'XLT', 'Limited', 'ST', 'Platinum', 'Timberline']
      },
      Escape: {
        SUV: ['S', 'SE', 'SEL', 'Titanium', 'ST-Line', 'PHEV']
      }
    },
    Chevrolet: {
      Silverado: {
        Truck: ['1500 Work Truck', '1500 Custom', '1500 LT', '1500 RST', '1500 LTZ', '1500 High Country', '2500HD', '3500HD']
      },
      Malibu: {
        Sedan: ['L', 'LS', 'RS', 'LT', 'Premier']
      },
      Equinox: {
        SUV: ['L', 'LS', 'LT', 'RS', 'Premier']
      },
      Tahoe: {
        SUV: ['LS', 'LT', 'RST', 'Premier', 'High Country']
      },
      Corvette: {
        Coupe: ['Stingray', 'Z06', 'E-Ray', 'ZR1'],
        Convertible: ['Stingray', 'Z06', 'E-Ray']
      }
    },
    BMW: {
      '3 Series': {
        Sedan: ['330i', '330e', 'M340i', 'M3'],
        Wagon: ['330i', 'M340i']
      },
      '5 Series': {
        Sedan: ['530i', '530e', '540i', 'M550i', 'M5']
      },
      X3: {
        SUV: ['xDrive30i', 'M40i', 'X3 M']
      },
      X5: {
        SUV: ['xDrive40i', 'xDrive50e', 'M60i', 'X5 M']
      }
    },
    'Mercedes-Benz': {
      'C-Class': {
        Sedan: ['C 300', 'C 300 4MATIC', 'AMG C 43', 'AMG C 63'],
        Coupe: ['C 300', 'AMG C 43', 'AMG C 63']
      },
      'E-Class': {
        Sedan: ['E 350', 'E 450 4MATIC', 'AMG E 53', 'AMG E 63'],
        Wagon: ['E 450 4MATIC', 'AMG E 63']
      },
      GLC: {
        SUV: ['GLC 300', 'GLC 300 4MATIC', 'AMG GLC 43', 'AMG GLC 63']
      },
      GLE: {
        SUV: ['GLE 350', 'GLE 450 4MATIC', 'AMG GLE 53', 'AMG GLE 63']
      }
    }
  },
  2024: {
    Honda: {
      Civic: {
        Sedan: ['LX', 'EX', 'EX-L', 'Sport', 'Touring'],
        Coupe: ['LX', 'EX', 'Si', 'Type R'],
        Hatchback: ['LX', 'Sport', 'Sport Touring']
      },
      Accord: {
        Sedan: ['LX', 'Sport', 'EX-L', 'Touring', 'Hybrid'],
        Hybrid: ['Sport', 'EX-L', 'Touring']
      },
      CRV: {
        SUV: ['LX', 'EX', 'EX-L', 'Sport', 'Touring', 'Hybrid']
      },
      Pilot: {
        SUV: ['LX', 'EX-L', 'Touring', 'Elite', 'Black Edition']
      },
      Ridgeline: {
        Truck: ['Sport', 'RTL', 'RTL-E', 'Black Edition']
      }
    },
    Toyota: {
      Camry: {
        Sedan: ['LE', 'SE', 'XLE', 'XSE', 'TRD'],
        Hybrid: ['LE', 'SE', 'XLE', 'XSE']
      },
      Corolla: {
        Sedan: ['L', 'LE', 'SE', 'XLE', 'XSE'],
        Hatchback: ['SE', 'XSE'],
        Hybrid: ['LE', 'SE']
      },
      RAV4: {
        SUV: ['LE', 'XLE', 'XLE Premium', 'Limited', 'Adventure', 'TRD Off-Road', 'Hybrid', 'Prime']
      },
      '4Runner': {
        SUV: ['SR5', 'TRD Off-Road', 'TRD Pro', 'Limited', 'Nightshade']
      },
      Tundra: {
        Truck: ['SR', 'SR5', 'Limited', 'Platinum', '1794 Edition', 'TRD Pro']
      }
    },
    Ford: {
      'F-150': {
        Truck: ['XL', 'XLT', 'Lariat', 'King Ranch', 'Platinum', 'Limited', 'Raptor', 'Lightning']
      },
      Mustang: {
        Coupe: ['EcoBoost', 'GT', 'Mach 1', 'Shelby GT500'],
        Convertible: ['EcoBoost', 'GT', 'Mach 1']
      },
      Explorer: {
        SUV: ['Base', 'XLT', 'Limited', 'ST', 'Platinum', 'Timberline']
      },
      Escape: {
        SUV: ['S', 'SE', 'SEL', 'Titanium', 'ST-Line', 'PHEV']
      },
      Bronco: {
        SUV: ['Base', 'Big Bend', 'Black Diamond', 'Outer Banks', 'Badlands', 'Wildtrak', 'Raptor']
      }
    },
    Chevrolet: {
      Silverado: {
        Truck: ['1500 Work Truck', '1500 Custom', '1500 LT', '1500 RST', '1500 LTZ', '1500 High Country', '2500HD', '3500HD']
      },
      Malibu: {
        Sedan: ['L', 'LS', 'RS', 'LT', 'Premier']
      },
      Equinox: {
        SUV: ['L', 'LS', 'LT', 'RS', 'Premier']
      },
      Tahoe: {
        SUV: ['LS', 'LT', 'RST', 'Premier', 'High Country']
      },
      Corvette: {
        Coupe: ['Stingray', 'Z06', 'E-Ray'],
        Convertible: ['Stingray', 'Z06', 'E-Ray']
      }
    },
    BMW: {
      '3 Series': {
        Sedan: ['330i', '330e', 'M340i', 'M3'],
        Wagon: ['330i', 'M340i']
      },
      '5 Series': {
        Sedan: ['530i', '530e', '540i', 'M550i', 'M5']
      },
      X3: {
        SUV: ['xDrive30i', 'M40i', 'X3 M']
      },
      X5: {
        SUV: ['xDrive40i', 'xDrive50e', 'M60i', 'X5 M']
      }
    },
    'Mercedes-Benz': {
      'C-Class': {
        Sedan: ['C 300', 'C 300 4MATIC', 'AMG C 43', 'AMG C 63'],
        Coupe: ['C 300', 'AMG C 43', 'AMG C 63']
      },
      'E-Class': {
        Sedan: ['E 350', 'E 450 4MATIC', 'AMG E 53', 'AMG E 63'],
        Wagon: ['E 450 4MATIC', 'AMG E 63']
      },
      GLC: {
        SUV: ['GLC 300', 'GLC 300 4MATIC', 'AMG GLC 43', 'AMG GLC 63']
      },
      GLE: {
        SUV: ['GLE 350', 'GLE 450 4MATIC', 'AMG GLE 53', 'AMG GLE 63']
      }
    },
    Nissan: {
      Altima: {
        Sedan: ['S', 'SR', 'SV', 'SL', 'Platinum']
      },
      Sentra: {
        Sedan: ['S', 'SV', 'SR', 'SR Premium']
      },
      Rogue: {
        SUV: ['S', 'SV', 'SL', 'Platinum']
      },
      Pathfinder: {
        SUV: ['S', 'SV', 'SL', 'Platinum']
      }
    },
    Audi: {
      A4: {
        Sedan: ['40', '45', 'S4'],
        Wagon: ['allroad']
      },
      A6: {
        Sedan: ['45', '55', 'S6', 'RS 6']
      },
      Q5: {
        SUV: ['40', '45', 'SQ5', 'RS Q5']
      },
      Q7: {
        SUV: ['45', '55', 'SQ7']
      }
    }
  },
  2023: {
    Honda: {
      Civic: {
        Sedan: ['LX', 'EX', 'EX-L', 'Sport', 'Touring'],
        Coupe: ['LX', 'EX', 'Si'],
        Hatchback: ['LX', 'Sport', 'Sport Touring']
      },
      Accord: {
        Sedan: ['LX', 'Sport', 'EX-L', 'Touring', 'Hybrid'],
        Hybrid: ['Sport', 'EX-L', 'Touring']
      },
      CRV: {
        SUV: ['LX', 'EX', 'EX-L', 'Sport', 'Touring', 'Hybrid']
      },
      Pilot: {
        SUV: ['LX', 'EX-L', 'Touring', 'Elite', 'Black Edition']
      }
    },
    Toyota: {
      Camry: {
        Sedan: ['LE', 'SE', 'XLE', 'XSE', 'TRD'],
        Hybrid: ['LE', 'SE', 'XLE', 'XSE']
      },
      Corolla: {
        Sedan: ['L', 'LE', 'SE', 'XLE', 'XSE'],
        Hatchback: ['SE', 'XSE'],
        Hybrid: ['LE', 'SE']
      },
      RAV4: {
        SUV: ['LE', 'XLE', 'XLE Premium', 'Limited', 'Adventure', 'TRD Off-Road', 'Hybrid', 'Prime']
      },
      '4Runner': {
        SUV: ['SR5', 'TRD Off-Road', 'TRD Pro', 'Limited', 'Nightshade']
      },
      Tundra: {
        Truck: ['SR', 'SR5', 'Limited', 'Platinum', '1794 Edition', 'TRD Pro']
      }
    },
    Ford: {
      'F-150': {
        Truck: ['XL', 'XLT', 'Lariat', 'King Ranch', 'Platinum', 'Limited', 'Raptor', 'Lightning']
      },
      Mustang: {
        Coupe: ['EcoBoost', 'GT', 'Mach 1'],
        Convertible: ['EcoBoost', 'GT', 'Mach 1']
      },
      Explorer: {
        SUV: ['Base', 'XLT', 'Limited', 'ST', 'Platinum', 'Timberline']
      },
      Escape: {
        SUV: ['S', 'SE', 'SEL', 'Titanium', 'ST-Line', 'PHEV']
      }
    },
    Chevrolet: {
      Silverado: {
        Truck: ['1500 Work Truck', '1500 Custom', '1500 LT', '1500 RST', '1500 LTZ', '1500 High Country', '2500HD', '3500HD']
      },
      Malibu: {
        Sedan: ['L', 'LS', 'RS', 'LT', 'Premier']
      },
      Equinox: {
        SUV: ['L', 'LS', 'LT', 'RS', 'Premier']
      },
      Tahoe: {
        SUV: ['LS', 'LT', 'RST', 'Premier', 'High Country']
      }
    },
    BMW: {
      '3 Series': {
        Sedan: ['330i', '330e', 'M340i', 'M3'],
        Wagon: ['330i', 'M340i']
      },
      '5 Series': {
        Sedan: ['530i', '530e', '540i', 'M550i', 'M5']
      },
      X3: {
        SUV: ['xDrive30i', 'M40i', 'X3 M']
      },
      X5: {
        SUV: ['xDrive40i', 'xDrive50e', 'M60i', 'X5 M']
      }
    },
    'Mercedes-Benz': {
      'C-Class': {
        Sedan: ['C 300', 'C 300 4MATIC', 'AMG C 43', 'AMG C 63'],
        Coupe: ['C 300', 'AMG C 43', 'AMG C 63']
      },
      'E-Class': {
        Sedan: ['E 350', 'E 450 4MATIC', 'AMG E 53', 'AMG E 63'],
        Wagon: ['E 450 4MATIC', 'AMG E 63']
      },
      GLC: {
        SUV: ['GLC 300', 'GLC 300 4MATIC', 'AMG GLC 43', 'AMG GLC 63']
      },
      GLE: {
        SUV: ['GLE 350', 'GLE 450 4MATIC', 'AMG GLE 53', 'AMG GLE 63']
      }
    },
    Nissan: {
      Altima: {
        Sedan: ['S', 'SR', 'SV', 'SL', 'Platinum']
      },
      Sentra: {
        Sedan: ['S', 'SV', 'SR', 'SR Premium']
      },
      Rogue: {
        SUV: ['S', 'SV', 'SL', 'Platinum']
      },
      Pathfinder: {
        SUV: ['S', 'SV', 'SL', 'Platinum']
      }
    },
    Audi: {
      A4: {
        Sedan: ['40', '45', 'S4'],
        Wagon: ['allroad']
      },
      A6: {
        Sedan: ['45', '55', 'S6', 'RS 6']
      },
      Q5: {
        SUV: ['40', '45', 'SQ5', 'RS Q5']
      },
      Q7: {
        SUV: ['45', '55', 'SQ7']
      }
    }
  },
  2022: {
    Honda: {
      Civic: {
        Sedan: ['LX', 'EX', 'EX-L', 'Sport', 'Touring'],
        Coupe: ['LX', 'EX', 'Si'],
        Hatchback: ['LX', 'Sport', 'Sport Touring']
      },
      Accord: {
        Sedan: ['LX', 'Sport', 'EX-L', 'Touring', 'Hybrid'],
        Hybrid: ['Sport', 'EX-L', 'Touring']
      },
      CRV: {
        SUV: ['LX', 'EX', 'EX-L', 'Sport', 'Touring', 'Hybrid']
      },
      Pilot: {
        SUV: ['LX', 'EX-L', 'Touring', 'Elite', 'Black Edition']
      }
    },
    Toyota: {
      Camry: {
        Sedan: ['LE', 'SE', 'XLE', 'XSE', 'TRD'],
        Hybrid: ['LE', 'SE', 'XLE', 'XSE']
      },
      Corolla: {
        Sedan: ['L', 'LE', 'SE', 'XLE', 'XSE'],
        Hatchback: ['SE', 'XSE'],
        Hybrid: ['LE', 'SE']
      },
      RAV4: {
        SUV: ['LE', 'XLE', 'XLE Premium', 'Limited', 'Adventure', 'TRD Off-Road', 'Hybrid', 'Prime']
      },
      '4Runner': {
        SUV: ['SR5', 'TRD Off-Road', 'TRD Pro', 'Limited', 'Nightshade']
      },
      Tundra: {
        Truck: ['SR', 'SR5', 'Limited', 'Platinum', '1794 Edition', 'TRD Pro']
      }
    },
    Ford: {
      'F-150': {
        Truck: ['XL', 'XLT', 'Lariat', 'King Ranch', 'Platinum', 'Limited', 'Raptor']
      },
      Mustang: {
        Coupe: ['EcoBoost', 'GT', 'Mach 1'],
        Convertible: ['EcoBoost', 'GT', 'Mach 1']
      },
      Explorer: {
        SUV: ['Base', 'XLT', 'Limited', 'ST', 'Platinum', 'Timberline']
      },
      Escape: {
        SUV: ['S', 'SE', 'SEL', 'Titanium', 'ST-Line', 'PHEV']
      }
    },
    Chevrolet: {
      Silverado: {
        Truck: ['1500 Work Truck', '1500 Custom', '1500 LT', '1500 RST', '1500 LTZ', '1500 High Country', '2500HD', '3500HD']
      },
      Malibu: {
        Sedan: ['L', 'LS', 'RS', 'LT', 'Premier']
      },
      Equinox: {
        SUV: ['L', 'LS', 'LT', 'RS', 'Premier']
      },
      Tahoe: {
        SUV: ['LS', 'LT', 'RST', 'Premier', 'High Country']
      }
    },
    BMW: {
      '3 Series': {
        Sedan: ['330i', '330e', 'M340i', 'M3'],
        Wagon: ['330i', 'M340i']
      },
      '5 Series': {
        Sedan: ['530i', '530e', '540i', 'M550i', 'M5']
      },
      X3: {
        SUV: ['xDrive30i', 'M40i', 'X3 M']
      },
      X5: {
        SUV: ['xDrive40i', 'xDrive50e', 'M60i', 'X5 M']
      }
    },
    'Mercedes-Benz': {
      'C-Class': {
        Sedan: ['C 300', 'C 300 4MATIC', 'AMG C 43', 'AMG C 63'],
        Coupe: ['C 300', 'AMG C 43', 'AMG C 63']
      },
      'E-Class': {
        Sedan: ['E 350', 'E 450 4MATIC', 'AMG E 53', 'AMG E 63'],
        Wagon: ['E 450 4MATIC', 'AMG E 63']
      },
      GLC: {
        SUV: ['GLC 300', 'GLC 300 4MATIC', 'AMG GLC 43', 'AMG GLC 63']
      },
      GLE: {
        SUV: ['GLE 350', 'GLE 450 4MATIC', 'AMG GLE 53', 'AMG GLE 63']
      }
    },
    Nissan: {
      Altima: {
        Sedan: ['S', 'SR', 'SV', 'SL', 'Platinum']
      },
      Sentra: {
        Sedan: ['S', 'SV', 'SR', 'SR Premium']
      },
      Rogue: {
        SUV: ['S', 'SV', 'SL', 'Platinum']
      },
      Pathfinder: {
        SUV: ['S', 'SV', 'SL', 'Platinum']
      }
    },
    Audi: {
      A4: {
        Sedan: ['40', '45', 'S4'],
        Wagon: ['allroad']
      },
      A6: {
        Sedan: ['45', '55', 'S6', 'RS 6']
      },
      Q5: {
        SUV: ['40', '45', 'SQ5', 'RS Q5']
      },
      Q7: {
        SUV: ['45', '55', 'SQ7']
      }
    }
  }
};

// Helper functions for Supabase-ready data access
// These will be replaced with Supabase queries later

export const getYears = () => {
  return Object.keys(carDatabase).sort((a, b) => b - a);
};

export const getMakesByYear = (year) => {
  if (!year || !carDatabase[year]) return [];
  return Object.keys(carDatabase[year]).sort();
};

export const getModelsByYearAndMake = (year, make) => {
  if (!year || !make || !carDatabase[year]?.[make]) return [];
  return Object.keys(carDatabase[year][make]).sort();
};

export const getSubmodelsByYearMakeAndModel = (year, make, model) => {
  if (!year || !make || !model || !carDatabase[year]?.[make]?.[model]) return [];
  return Object.keys(carDatabase[year][make][model]).sort();
};

export const getTrimsByYearMakeModelAndSubmodel = (year, make, model, submodel) => {
  if (!year || !make || !model || !submodel || !carDatabase[year]?.[make]?.[model]?.[submodel]) return [];
  return carDatabase[year][make][model][submodel].sort();
};

