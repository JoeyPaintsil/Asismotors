import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const MechanicalStep = ({ formData, updateFormData, onNext, onBack, currentStep, totalSteps, mandatory_fill }) => {
  const [mechanical, setMechanical] = useState(formData.mechanical || '');

  const options = [
    { value: 'runs-drives', label: 'Vehicle starts, runs, and drives' },
    { value: 'starts-no-drive', label: 'Vehicle starts but does not drive' },
    { value: 'no-start', label: 'Vehicle does not start or drive' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mandatory_fill || mechanical) {
      updateFormData({ mechanical });
      onNext();
    }
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>Mechanical Condition</h3>
        <p>How does your vehicle run?</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        <div className="step-card__radio-group">
          {options.map((option) => (
            <label key={option.value} className="step-card__radio">
              <input
                type="radio"
                name="mechanical"
                value={option.value}
                checked={mechanical === option.value}
                onChange={(e) => setMechanical(e.target.value)}
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
              Your vehicle <strong>must</strong> have <strong>keys</strong> and a <strong>charged</strong> and functioning
              battery to start, and must be able to drive <strong>safely to highway speeds</strong> to be driveable.
            </p>
          </div>
        </div>

        <div className="step-card__warning">
          <span className="step-card__warning-icon">⚠️</span>
          <div>
            <strong>Catalytic Converter Disclaimer:</strong>
            <p>
              Due to a nationwide influx of vehicles with missing, stolen, or aftermarket catalytic converters in recent
              months, our local buyers reserve the right to adjust pricing or refuse pickup if the catalytic converter is
              removed or has been replaced upon arrival.
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

export default MechanicalStep;

