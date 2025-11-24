import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './LockInOffer.scss';

const LockInOffer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleData, formData, offerPrice } = location.state || {};

  const [firstName, setFirstName] = useState(formData?.firstName || '');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState(formData?.phone || '');

  // Format vehicle name
  const getVehicleName = () => {
    if (!vehicleData) return 'Your Vehicle';
    const parts = [];
    if (vehicleData.year) parts.push(vehicleData.year);
    if (vehicleData.make) parts.push(vehicleData.make);
    if (vehicleData.model) parts.push(vehicleData.model);
    if (vehicleData.submodel) parts.push(`/${vehicleData.submodel}`);
    if (vehicleData.trim) parts.push(vehicleData.trim);
    return parts.length > 0 ? parts.join(' ') : 'Your Vehicle';
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && phone) {
      // TODO: Submit to backend API
      console.log('Locking in offer:', {
        vehicleData,
        formData: { ...formData, firstName, lastName, phone },
        offerPrice
      });
      
      // Navigate to success/confirmation page (to be created)
      // For now, just log
      alert('Offer locked in! (This is temporary - API integration pending)');
    }
  };

  return (
    <div className="lock-in-page">
      <Header />
      <div className="lock-in">
        <div className="lock-in__container">
          <div className="lock-in__header">
            <h1>Lock in your offer!</h1>
            <p className="lock-in__vehicle">{getVehicleName()}</p>
          </div>

          <div className="lock-in__content">
            <div className="lock-in__question">
              Who do we contact for scheduling?
            </div>

            <form onSubmit={handleSubmit} className="lock-in__form">
              <div className="lock-in__input-group">
                <span className="lock-in__icon">👤</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="lock-in__input-group">
                <span className="lock-in__icon">👤</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </div>

              <div className="lock-in__input-group">
                <span className="lock-in__icon">📞</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="Phone Number"
                  maxLength={14}
                  required
                />
              </div>

              <button type="submit" className="lock-in__submit-button">
                Save and Next »
              </button>
            </form>

            <div className="lock-in__info">
              <span className="lock-in__info-icon">ℹ️</span>
              <div className="lock-in__info-text">
                <strong>Keep in mind:</strong> Your offer is not locked in and is subject to change until all required information is provided.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LockInOffer;

