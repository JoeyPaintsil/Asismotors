import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const ExteriorDamageStep = ({ formData, updateFormData, onNext, onBack, currentStep, totalSteps, mandatory_fill }) => {
  const [exteriorDamage, setExteriorDamage] = useState(formData.exteriorDamage || '');

  const options = [
    { value: 'no-damage', label: 'Vehicle has no damage larger than a baseball' },
    { value: 'has-damage', label: 'Vehicle has dents, damage, or rust larger than a baseball' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mandatory_fill || exteriorDamage) {
      updateFormData({ exteriorDamage });
      onNext();
    }
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>Exterior Damage</h3>
        <p>Describe any damage to your vehicle's exterior</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        <div className="step-card__radio-group">
          {options.map((option) => (
            <label key={option.value} className="step-card__radio">
              <input
                type="radio"
                name="exteriorDamage"
                value={option.value}
                checked={exteriorDamage === option.value}
                onChange={(e) => setExteriorDamage(e.target.value)}
                required={mandatory_fill}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        <div className="step-card__info">
          <span className="step-card__info-icon">ℹ️</span>
          <div>
            <strong>Keep in mind:</strong>
            <p>Body damage includes areas of faded, scraped, or damaged paint.</p>
          </div>
        </div>

        <div className="step-card__actions">
          <button type="button" onClick={onBack} className="step-card__button step-card__button--secondary">
            Back
          </button>
          <button type="submit" className="step-card__button step-card__button--primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExteriorDamageStep;

