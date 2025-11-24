import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const LightsStep = ({ formData, updateFormData, onNext, onBack, currentStep, totalSteps, mandatory_fill }) => {
  const [lights, setLights] = useState(formData.lights || '');

  const options = [
    { value: 'no-issues', label: 'Vehicle has no missing or cracked lights, mirrors, or glass' },
    { value: 'has-issues', label: 'Vehicle has missing or cracked lights, mirrors, or glass' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mandatory_fill || lights) {
      updateFormData({ lights });
      onNext();
    }
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>Lights and Glass</h3>
        <p>Are all lights, mirrors, and glass intact?</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        <div className="step-card__radio-group">
          {options.map((option) => (
            <label key={option.value} className="step-card__radio">
              <input
                type="radio"
                name="lights"
                value={option.value}
                checked={lights === option.value}
                onChange={(e) => setLights(e.target.value)}
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
            <p>
              Lights, mirrors, and glass include headlights, taillights, and windows and include plastic light covers.
            </p>
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

export default LightsStep;

