import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const FinalDetailsStep = ({ formData, updateFormData, onNext, onBack, currentStep, totalSteps }) => {
  const [finalDetails, setFinalDetails] = useState(formData.finalDetails || []);
  const [noneApply, setNoneApply] = useState(formData.noneApply || false);

  const options = [
    { value: 'catalytic', label: 'Vehicle has missing or replaced catalytic converters' },
    { value: 'interior', label: 'Vehicle has damaged or missing interior parts' },
    { value: 'water-fire', label: 'Vehicle has suffered water or fire damage' }
  ];

  const handleOptionChange = (value) => {
    if (noneApply) {
      setNoneApply(false);
    }
    setFinalDetails((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const handleNoneApply = () => {
    setNoneApply(true);
    setFinalDetails([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ finalDetails, noneApply });
    onNext();
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>Final Details</h3>
        <p>Select any additional issues with your vehicle</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        <div className="step-card__radio-group">
          {options.map((option) => (
            <label key={option.value} className="step-card__radio">
              <input
                type="checkbox"
                name="finalDetails"
                value={option.value}
                checked={finalDetails.includes(option.value)}
                onChange={() => handleOptionChange(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={handleNoneApply}
          className={`step-card__button step-card__button--none ${noneApply ? 'is-active' : ''}`}
        >
          None of the above apply
        </button>

        <div className="step-card__info">
          <span className="step-card__info-icon">ℹ️</span>
          <div>
            <strong>Keep in mind:</strong>
            <ul className="step-card__info-list">
              <li>
                Missing or replaced catalytic converters <strong>may be subject to repricing.</strong>
              </li>
              <li>
                Interior damage <strong>includes deployed airbags.</strong>
              </li>
              <li>Any mold or mildew will be considered water damage.</li>
            </ul>
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

export default FinalDetailsStep;

