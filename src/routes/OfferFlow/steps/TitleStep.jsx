import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const TitleStep = ({ formData, updateFormData, onNext, onBack, currentStep, totalSteps, mandatory_fill }) => {
  const [title, setTitle] = useState(formData.title || '');

  const options = [
    { value: 'clean', label: 'I have a clean title' },
    { value: 'salvage', label: 'I have a salvage or rebuilt title' },
    { value: 'no-title', label: 'I have no title' },
    { value: 'lien', label: 'I have an unreleased lien' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mandatory_fill || title) {
      updateFormData({ title });
      onNext();
    }
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>Title and Ownership</h3>
        <p>Select the option that best describes your vehicle's title status</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        <div className="step-card__radio-group">
          {options.map((option) => (
            <label key={option.value} className="step-card__radio">
              <input
                type="radio"
                name="title"
                value={option.value}
                checked={title === option.value}
                onChange={(e) => setTitle(e.target.value)}
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
              If you select "no title" you may need a registration, matching photo ID, and other paperwork in some cases.
              Additionally, we can <em>never</em> buy any vehicles with an active lien.
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

export default TitleStep;

