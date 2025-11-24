import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const ExteriorPartsStep = ({ formData, updateFormData, onNext, onBack, currentStep, totalSteps, mandatory_fill }) => {
  const [exteriorParts, setExteriorParts] = useState(formData.exteriorParts || '');

  const options = [
    { value: 'all-attached', label: 'All body panels are fully and securely attached' },
    { value: 'has-issues', label: 'Vehicle has hanging, loose, or missing body panels' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mandatory_fill || exteriorParts) {
      updateFormData({ exteriorParts });
      // This is the last step, so we could submit the form here
      onNext();
    }
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>Exterior Parts</h3>
        <p>Are all body panels properly attached?</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        <div className="step-card__radio-group">
          {options.map((option) => (
            <label key={option.value} className="step-card__radio">
              <input
                type="radio"
                name="exteriorParts"
                value={option.value}
                checked={exteriorParts === option.value}
                onChange={(e) => setExteriorParts(e.target.value)}
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
              "Body panels" include any painted surface such as bumpers, fenders, doors, hoods, etc., and must be fully
              attached as they came from the factory.
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

export default ExteriorPartsStep;

