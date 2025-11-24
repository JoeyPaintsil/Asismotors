import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { calculateOfferPrice } from '../../services/temporaryPricingLogic';
import './OfferDisplay.scss';

const OfferDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleData, formData } = location.state || {};

  // Calculate offer price using temporary logic
  const offerPrice = vehicleData && formData 
    ? calculateOfferPrice(vehicleData, formData)
    : 0;

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

  const handleAcceptOffer = () => {
    // Navigate to lock-in page with all data
    navigate('/lock-in-offer', {
      state: {
        vehicleData,
        formData,
        offerPrice
      }
    });
  };

  const handleChangeCondition = () => {
    // Navigate back to offer flow with existing data
    navigate('/offer-flow', {
      state: {
        vehicleData,
        formData
      }
    });
  };

  const handleUploadPhotos = () => {
    // TODO: Implement photo upload functionality
    console.log('Upload photos clicked');
  };

  return (
    <div className="offer-display-page">
      <Header />
      <div className="offer-display">
        <div className="offer-display__container">
          <div className="offer-display__card">
            <div className="offer-display__header">
              <h1>Your Offer</h1>
              <p className="offer-display__vehicle">{getVehicleName()}</p>
            </div>

            <div className="offer-display__price-section">
              <div className="offer-display__price">
                <span className="offer-display__currency">$</span>
                <span className="offer-display__amount">{offerPrice.toLocaleString()}</span>
              </div>
              <div className="offer-display__benefits">
                <div className="offer-display__benefit">
                  <span className="offer-display__benefit-icon">🚚</span>
                  <span>Free pickup & towing</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleAcceptOffer}
              className="offer-display__accept-button"
            >
              Accept Offer
            </button>

            <div className="offer-display__footer">
              <p className="offer-display__disclaimer">
                This offer is valid until you accept and lock it in. You can update your vehicle details or add photos before accepting.
              </p>
              <div className="offer-display__links">
                <button 
                  onClick={handleChangeCondition}
                  className="offer-display__link"
                >
                  <span className="offer-display__link-icon">🔧</span>
                  <span>Update condition</span>
                </button>
                <button 
                  onClick={handleUploadPhotos}
                  className="offer-display__link"
                >
                  <span className="offer-display__link-icon">📷</span>
                  <span>Add photos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OfferDisplay;

