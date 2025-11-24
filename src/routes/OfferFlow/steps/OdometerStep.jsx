import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const OdometerStep = ({ formData, updateFormData, onNext, onBack, currentStep, totalSteps, mandatory_fill }) => {
  const [odometer, setOdometer] = useState(formData.odometer || '');
  const [odometerUnknown, setOdometerUnknown] = useState(formData.odometerUnknown || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mandatory_fill || odometerUnknown || (odometer && /^\d+$/.test(odometer))) {
      updateFormData({ odometer: odometerUnknown ? 'unknown' : odometer, odometerUnknown });
      onNext();
    }
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>Odometer Reading</h3>
        <p>Enter your vehicle's current mileage</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        <div className="step-card__input-group step-card__input-group--large">
          <input
            type="text"
            value={odometer}
            onChange={(e) => setOdometer(e.target.value.replace(/\D/g, ''))}
            placeholder="0"
            disabled={odometerUnknown}
            required={mandatory_fill && !odometerUnknown}
            className="step-card__odometer-input"
          />
          <span className="step-card__odometer-suffix">,000 Miles</span>
        </div>

        <label className="step-card__checkbox">
          <input
            type="checkbox"
            checked={odometerUnknown}
            onChange={(e) => {
              setOdometerUnknown(e.target.checked);
              if (e.target.checked) setOdometer('');
            }}
          />
          <span>I cannot verify the mileage</span>
        </label>

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

export default OdometerStep;

