import { useState, useEffect } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const QuestionStep = ({ 
  question, 
  answer, 
  onAnswer, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps,
  mandatory_fill,
  isLastQuestion = false
}) => {
  // For odometer type, handle both mileage input and cannot verify checkbox
  const isOdometer = question.type === 'odometer';
  
  // Initialize state based on answer prop, but ensure empty string for textarea
  const getInitialAnswer = () => {
    if (isOdometer && answer && typeof answer === 'object') {
      return answer;
    }
    // Always start empty for textarea, ignore any previous answer
    if (question.type === 'textarea') {
      return '';
    }
    return answer || '';
  };
  
  const [mileage, setMileage] = useState(isOdometer && answer && typeof answer === 'object' ? (answer.mileage || '') : '');
  const [cannotVerify, setCannotVerify] = useState(isOdometer && answer && typeof answer === 'object' ? (answer.cannotVerify || false) : false);
  const [selectedAnswer, setSelectedAnswer] = useState(getInitialAnswer());
  
  // Reset textarea to empty when question changes
  useEffect(() => {
    if (question.type === 'textarea') {
      setSelectedAnswer('');
    }
  }, [question.id, question.type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOdometer) {
      // For odometer, send object with mileage and cannotVerify
      if (!mandatory_fill || mileage || cannotVerify) {
        onAnswer({ mileage, cannotVerify });
        onNext();
      }
    } else {
      if (!mandatory_fill || selectedAnswer) {
        onAnswer(selectedAnswer);
        onNext();
      }
    }
  };

  const renderInput = () => {
    // Special handling for odometer reading
    if (question.type === 'odometer') {
      return (
        <div className="step-card__odometer-group">
          <div className="step-card__odometer-input-wrapper">
            <input
              type="text"
              value={mileage}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
                setMileage(value);
                setCannotVerify(false); // Uncheck cannot verify when entering mileage
              }}
              placeholder={question.placeholder || ''}
              disabled={cannotVerify}
              className="step-card__odometer-input"
            />
            <span className="step-card__odometer-suffix">Miles</span>
          </div>
          <div className="step-card__odometer-divider"></div>
          <label className="step-card__odometer-checkbox">
            <input
              type="checkbox"
              checked={cannotVerify}
              onChange={(e) => {
                setCannotVerify(e.target.checked);
                if (e.target.checked) {
                  setMileage(''); // Clear mileage when checking cannot verify
                }
              }}
            />
            <span>{question.cannotVerifyLabel || 'I cannot verify the mileage'}</span>
          </label>
        </div>
      );
    }

    if ((question.type === 'yes_no' || question.type === 'radio') && question.options) {
      return (
        <div className="step-card__radio-group">
          {question.options.map((option) => (
            <label key={option.value} className="step-card__radio">
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={selectedAnswer === option.value}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                required={mandatory_fill && !question.optional}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      );
    }

    if (question.type === 'number') {
      return (
        <div className="step-card__input-group">
          <input
            type="number"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            placeholder={question.placeholder || 'Enter value'}
            min="0"
            required={mandatory_fill && !question.optional}
            className="step-card__input"
          />
        </div>
      );
    }

    if (question.type === 'textarea') {
      return (
        <div className="step-card__input-group">
          <textarea
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            placeholder={question.placeholder || 'Enter details...'}
            rows={4}
            required={mandatory_fill && !question.optional}
            className="step-card__textarea"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>{question.category}</h3>
        <p>{question.text}</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        {renderInput()}

        <div className="step-card__actions">
          <button 
            type="button" 
            onClick={onBack} 
            className="step-card__button step-card__button--secondary"
          >
            Back
          </button>
          <button 
            type="submit" 
            className="step-card__button step-card__button--primary"
            disabled={mandatory_fill && !selectedAnswer && !(isOdometer && (mileage || cannotVerify))}
          >
            {isLastQuestion ? 'Get Instant Offer' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionStep;

