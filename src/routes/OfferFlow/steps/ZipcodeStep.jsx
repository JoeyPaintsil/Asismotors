import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const ZipcodeStep = ({ formData, updateFormData, onNext, onBack, currentStep, totalSteps, mandatory_fill }) => {
  const [zipcode, setZipcode] = useState(formData.zipcode || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mandatory_fill || (zipcode && /^\d{5}(-\d{4})?$/.test(zipcode))) {
      updateFormData({ zipcode });
      onNext();
    }
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>Pickup Location</h3>
        <p>Enter the zipcode where your vehicle will be picked up</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        <div className="step-card__input-group">
          <span className="step-card__icon">📍</span>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            placeholder="Enter zipcode"
            pattern="[0-9]{5}"
            maxLength={5}
            required={mandatory_fill}
          />
        </div>

        <div className="step-card__info">
          <span className="step-card__info-icon">ℹ️</span>
          <div>
            <strong>Keep in mind:</strong>
            <p>This is the zipcode where the vehicle will be picked up. This may or may not be where you live.</p>
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

export default ZipcodeStep;

