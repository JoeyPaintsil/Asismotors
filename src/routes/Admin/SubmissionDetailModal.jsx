import { questions } from '../../data/questions';
import './SubmissionDetailModal.scss';

const SubmissionDetailModal = ({ submission, onClose }) => {
  if (!submission) return null;

  const formatAnswer = (questionId, answer) => {
    if (!answer) return 'Not answered';

    const question = questions.find(q => q.id === questionId);
    if (!question) return String(answer);

    // Handle odometer reading
    if (question.type === 'odometer' && typeof answer === 'object') {
      if (answer.cannotVerify) {
        return 'Cannot verify mileage';
      }
      return answer.mileage ? `${answer.mileage} miles` : 'Not specified';
    }

    // Handle textarea
    if (question.type === 'textarea') {
      return answer || 'No comments';
    }

    // Handle radio options
    if (question.options) {
      const option = question.options.find(opt => opt.value === answer);
      return option ? option.label : String(answer);
    }

    return String(answer);
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getVehicleInfo = () => {
    if (submission.vehicleData?.vin) {
      return `VIN: ${submission.vehicleData.vin}`;
    }
    const parts = [];
    if (submission.vehicleData?.year) parts.push(submission.vehicleData.year);
    if (submission.vehicleData?.makeCode) parts.push(submission.vehicleData.makeCode);
    if (submission.vehicleData?.model) parts.push(submission.vehicleData.model);
    return parts.join(' ') || 'N/A';
  };

  return (
    <div className="submission-modal" onClick={onClose}>
      <div className="submission-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="submission-modal__header">
          <h2>Submission Details</h2>
          <button className="submission-modal__close" onClick={onClose}>×</button>
        </div>

        <div className="submission-modal__body">
          {/* Contact Information */}
          <div className="submission-modal__section">
            <h3>Contact Information</h3>
            <div className="submission-modal__info-grid">
              <div>
                <strong>Name:</strong> {submission.name || 'N/A'}
              </div>
              <div>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${submission.email}`} className="submission-modal__email-link">
                  {submission.email || 'N/A'}
                </a>
              </div>
              <div>
                <strong>Phone:</strong> {submission.phone || 'N/A'}
              </div>
              <div>
                <strong>Zipcode:</strong> {submission.zipcode || 'N/A'}
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="submission-modal__section">
            <h3>Vehicle Information</h3>
            <div className="submission-modal__info-grid">
              <div>
                <strong>Vehicle:</strong> {getVehicleInfo()}
              </div>
              <div>
                <strong>Instant Quote:</strong>{' '}
                <span className="submission-modal__quote">
                  {formatCurrency(submission.quote?.amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Question Answers */}
          <div className="submission-modal__section">
            <h3>Question Answers</h3>
            <div className="submission-modal__answers">
              {questions.map((question) => {
                const answer = submission.answers?.[question.id];
                return (
                  <div key={question.id} className="submission-modal__answer-item">
                    <div className="submission-modal__question">
                      <strong>{question.category}</strong>
                      {question.text !== question.category && (
                        <span className="submission-modal__question-text"> - {question.text}</span>
                      )}
                    </div>
                    <div className="submission-modal__answer">
                      {formatAnswer(question.id, answer)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="submission-modal__footer">
          <button className="submission-modal__button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailModal;

