import { useState, useEffect } from 'react';
import { getInstaQuote } from '../../../services/copartService';
import { saveSubmission } from '../../../services/submissionService';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const QuoteStep = ({ vehicleData, answers, zipcode, contactInfo, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        setError(null);

        // Prepare form data for API
        // Map answers to API format (you may need to adjust this based on API requirements)
        const formData = {
          vin: vehicleData.vin || '',
          year: vehicleData.year || '',
          makeCode: vehicleData.makeCode || '',
          model: vehicleData.model || '',
          postalCode: zipcode || '',
          // Add other fields from answers as needed
          odometerReading: answers.odometer_reading?.mileage || '',
          // Map other answers to API fields
        };

        const response = await getInstaQuote(formData);
        setQuote(response);

        // Save submission to admin dashboard
        try {
          await saveSubmission({
            name: contactInfo.firstName || '',
            email: contactInfo.email || '',
            phone: contactInfo.phone || '',
            zipcode: zipcode || '',
            vehicleData: vehicleData,
            quote: response,
            answers: answers
          });
        } catch (error) {
          console.error('Error saving submission:', error);
          // Don't block the user if saving fails
        }
      } catch (err) {
        console.error('Error getting quote:', err);
        setError(err.message || 'Failed to get quote. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [vehicleData, answers, zipcode]);

  if (loading) {
    return (
      <div className="step-card">
        <ProgressBar currentStep={100} totalSteps={100} />
        <div className="step-card__header">
          <h3>Getting Your Quote</h3>
          <p>Please wait while we calculate your instant quote...</p>
        </div>
        <div className="step-card__loading">
          <div className="step-card__spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="step-card">
        <ProgressBar currentStep={100} totalSteps={100} />
        <div className="step-card__header">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
        <div className="step-card__actions">
          <button onClick={onBack} className="step-card__button step-card__button--secondary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <ProgressBar currentStep={100} totalSteps={100} />
      <div className="step-card__header">
        <h3>Your Instant Quote</h3>
        <p>Based on the information you provided</p>
      </div>

      <div className="step-card__quote">
        {quote?.instaQuote && (
          <div className="step-card__quote-amount">
            ${parseFloat(quote.instaQuote).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
        )}
        
        {quote?.statusCode && (
          <div className="step-card__quote-status">
            Status: <span className={`step-card__status-badge ${quote.statusCode.toLowerCase()}`}>
              {quote.statusCode}
            </span>
          </div>
        )}
        
        {quote?.numberOfLots && (
          <div className="step-card__quote-lots">
            Based on {quote.numberOfLots} comparable vehicles
          </div>
        )}

        <div className="step-card__contact-summary">
          <h4>Contact Information</h4>
          <p><strong>Name:</strong> {contactInfo.firstName}</p>
          <p><strong>Email:</strong> {contactInfo.email}</p>
          <p><strong>Phone:</strong> {contactInfo.phone}</p>
          <p><strong>Preferred Contact:</strong> {
            Object.entries(contactInfo.contactMethods)
              .filter(([_, selected]) => selected)
              .map(([method]) => method.charAt(0).toUpperCase() + method.slice(1))
              .join(', ') || 'None selected'
          }</p>
        </div>
      </div>

      <div className="step-card__actions">
        <button onClick={onBack} className="step-card__button step-card__button--secondary">
          Back
        </button>
        <button className="step-card__button step-card__button--primary">
          Lock In Offer
        </button>
      </div>
    </div>
  );
};

export default QuoteStep;

