import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import './Step.scss';

const ContactStep = ({ formData, updateFormData, onNext, onBack, currentStep, totalSteps, mandatory_fill }) => {
  const [firstName, setFirstName] = useState(formData.firstName || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [email, setEmail] = useState(formData.email || '');
  const [contactMethods, setContactMethods] = useState(formData.contactMethods || { call: false, text: false, email: false });

  const handleContactMethodChange = (method) => {
    setContactMethods((prev) => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mandatory_fill || (firstName && phone && email && Object.values(contactMethods).some(Boolean))) {
      updateFormData({ firstName, phone, email, contactMethods });
      onNext();
    }
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  return (
    <div className="step-card">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="step-card__header">
        <h3>Contact Information</h3>
        <p>We'll use this to send you your offer and schedule pickup</p>
      </div>

      <form onSubmit={handleSubmit} className="step-card__form">
        <div className="step-card__input-group">
          <span className="step-card__icon">👤</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required={mandatory_fill}
          />
        </div>

        <div className="step-card__input-group">
          <span className="step-card__icon">📞</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="Phone Number"
            maxLength={14}
            required={mandatory_fill}
          />
        </div>

        <div className="step-card__input-group">
          <span className="step-card__icon">✉️</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required={mandatory_fill}
          />
        </div>

        <div className="step-card__section">
          <h4>Preferred contact methods</h4>
          <div className="step-card__checkboxes">
            <label className="step-card__checkbox">
              <input
                type="checkbox"
                checked={contactMethods.call}
                onChange={() => handleContactMethodChange('call')}
              />
              <span>Call</span>
            </label>
            <label className="step-card__checkbox">
              <input
                type="checkbox"
                checked={contactMethods.text}
                onChange={() => handleContactMethodChange('text')}
              />
              <span>Text</span>
            </label>
            <label className="step-card__checkbox">
              <input
                type="checkbox"
                checked={contactMethods.email}
                onChange={() => handleContactMethodChange('email')}
              />
              <span>Email</span>
            </label>
          </div>
        </div>

        <div className="step-card__actions">
          <button type="button" onClick={onBack} className="step-card__button step-card__button--secondary">
            Back
          </button>
          <button type="submit" className="step-card__button step-card__button--primary">
            Get Instant Offer
          </button>
        </div>

        <p className="step-card__disclaimer">
          By continuing you agree to our <a href="/terms">Terms of Service</a>.
        </p>
      </form>
    </div>
  );
};

export default ContactStep;

