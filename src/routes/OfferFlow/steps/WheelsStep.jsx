import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const WheelsStep = ({ formData, updateFormData, onNext, onBack, currentStep, totalSteps, mandatory_fill }) => {
  const [wheels, setWheels] = useState(formData.wheels || '');

  const options = [
    { value: 'all-mounted', label: 'All wheels are mounted and all tires are inflated' },
    { value: 'flat-tires', label: 'There are one or more flat tires' },
    { value: 'wheels-removed', label: 'There are one or more wheels removed' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mandatory_fill || wheels) {
      updateFormData({ wheels });
      onNext();
    }
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>Wheels and Tires</h3>
        <p>Tell us about the condition of your vehicle's wheels and tires</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        <div className="step-card__radio-group">
          {options.map((option) => (
            <label key={option.value} className="step-card__radio">
              <input
                type="radio"
                name="wheels"
                value={option.value}
                checked={wheels === option.value}
                onChange={(e) => setWheels(e.target.value)}
                required={mandatory_fill}
              />
              <span>{option.label}</span>
            </label>
          ))}
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

export default WheelsStep;

