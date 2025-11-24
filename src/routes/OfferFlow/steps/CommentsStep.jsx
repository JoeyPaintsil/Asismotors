import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const CommentsStep = ({ formData, updateFormData, onBack, currentStep, totalSteps, vehicleData }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState(formData.comments || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormData = { ...formData, comments };
    updateFormData({ comments });
    
    // Navigate to offer display page with all data
    navigate('/offer-display', {
      state: {
        vehicleData,
        formData: finalFormData
      }
    });
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>Comments (optional)</h3>
        <p>Tell us anything else we should know about your vehicle</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        <div className="step-card__textarea-group">
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Tell us anything else about the vehicle we should know. If there are any missing or removed parts from the vehicle, especially catalytic converters, please list them here as well."
            rows={6}
            className="step-card__textarea"
          />
        </div>

        <div className="step-card__actions step-card__actions--final">
          <button type="button" onClick={onBack} className="step-card__button step-card__button--secondary">
            Back
          </button>
          <button type="submit" className="step-card__button step-card__button--primary step-card__button--large">
            Get your instant offer!
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentsStep;

