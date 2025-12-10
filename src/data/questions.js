/**
 * Questions extracted from JOEY INSTANT QUOTE (1).docx
 * Structured for one-by-one question flow with specific answer options
 */

export const questions = [
  // Title and Ownership
  {
    id: 'title_ownership',
    category: 'Title and Ownership',
    text: 'Title and Ownership',
    type: 'radio',
    options: [
      { value: 'clean_title', label: 'I possess a clean title for the vehicle.' },
      { value: 'salvage_title', label: 'The vehicle has a salvage or rebuilt title.' },
      { value: 'no_title', label: 'I do not have the title for the vehicle.' },
      { value: 'unresolved_lien', label: 'There is an unresolved lien on the vehicle.' }
    ]
  },
  
  // Wheels and Tires
  {
    id: 'wheels_tires',
    category: 'Wheels and Tires',
    text: 'Wheels and Tires',
    type: 'radio',
    options: [
      { value: 'all_inflated', label: 'All tires are inflated and securely mounted on the vehicle.' },
      { value: 'flat_tires', label: 'One or more tires are flat.' },
      { value: 'wheels_removed', label: 'A wheel or wheels have been removed from the vehicle.' }
    ]
  },
  
  // Mechanical Condition
  {
    id: 'mechanical_condition',
    category: 'Mechanical Condition',
    text: 'Mechanical Condition',
    type: 'radio',
    options: [
      { value: 'runs_drives', label: 'The vehicle starts, runs, and drives without issue.' },
      { value: 'starts_no_drive', label: 'The vehicle starts, but it cannot drive.' },
      { value: 'no_start_no_drive', label: 'The vehicle neither starts nor drives.' }
    ]
  },
  
  // Odometer Reading
  {
    id: 'odometer_reading',
    category: 'Odometer Reading',
    text: 'Odometer Reading',
    type: 'odometer',
    placeholder: '',
    cannotVerifyLabel: 'I cannot verify the mileage'
  },
  
  // Exterior Damage
  {
    id: 'exterior_damage',
    category: 'Exterior Damage',
    text: 'Exterior Damage',
    type: 'radio',
    options: [
      { value: 'no_damage', label: 'The vehicle has no significant exterior damage.' },
      { value: 'has_damage', label: 'There is exterior damage that is noticeable or severe.' }
    ]
  },
  
  // Exterior Parts
  {
    id: 'exterior_parts',
    category: 'Exterior Parts',
    text: 'Exterior Parts',
    type: 'radio',
    options: [
      { value: 'all_attached', label: 'All body panels are properly attached and secured.' },
      { value: 'panels_detached', label: 'One or more body panels are detached or hanging loose.' }
    ]
  },
  
  // Lights and Glass
  {
    id: 'lights_glass',
    category: 'Lights and Glass',
    text: 'Lights and Glass',
    type: 'radio',
    options: [
      { value: 'all_intact', label: 'All lights, mirrors, and glass are intact and unbroken.' },
      { value: 'missing_cracked', label: 'There are missing or cracked lights, mirrors, or glass.' }
    ]
  },
  
  // Final Details
  {
    id: 'final_details',
    category: 'Final Details',
    text: 'Final Details',
    type: 'radio',
    options: [
      { value: 'catalytic_missing', label: 'The vehicle has either missing or replaced catalytic converters.' },
      { value: 'interior_damaged', label: 'There are damaged or missing interior parts.' },
      { value: 'water_fire_damage', label: 'The vehicle has sustained water or fire damage.' },
      { value: 'none_apply', label: 'None of the above applies to the vehicle.' }
    ]
  },
  
  // Comments (optional)
  {
    id: 'comments',
    category: 'Comments',
    text: 'Feel free to add any additional comments regarding the condition of the vehicle.',
    type: 'textarea',
    optional: true,
    placeholder: 'Enter any additional comments...'
  }
];
