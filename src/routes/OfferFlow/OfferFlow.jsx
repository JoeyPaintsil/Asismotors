import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProgressBar from './components/ProgressBar';
import ZipcodeStep from './steps/ZipcodeStep';
import ContactStep from './steps/ContactStep';
import TitleStep from './steps/TitleStep';
import WheelsStep from './steps/WheelsStep';
import MechanicalStep from './steps/MechanicalStep';
import OdometerStep from './steps/OdometerStep';
import ExteriorDamageStep from './steps/ExteriorDamageStep';
import ExteriorPartsStep from './steps/ExteriorPartsStep';
import LightsStep from './steps/LightsStep';
import FinalDetailsStep from './steps/FinalDetailsStep';
import CommentsStep from './steps/CommentsStep';
import './OfferFlow.scss';

const STEPS = [
  { id: 'zipcode', title: 'Pickup Location' },
  { id: 'contact', title: 'Contact Info' },
  { id: 'title', title: 'Title & Ownership' },
  { id: 'wheels', title: 'Wheels & Tires' },
  { id: 'mechanical', title: 'Mechanical Condition' },
  { id: 'odometer', title: 'Odometer' },
  { id: 'exterior-damage', title: 'Exterior Damage' },
  { id: 'exterior-parts', title: 'Exterior Parts' },
  { id: 'lights', title: 'Lights & Glass' },
  { id: 'final-details', title: 'Final Details' },
  { id: 'comments', title: 'Comments' }
];

const OfferFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicleData = location.state?.vehicleData || {};

  const [currentStep, setCurrentStep] = useState(0);
  const [mandatory_fill, setMandatoryFill] = useState(false);
  const [formData, setFormData] = useState({
    zipcode: '',
    firstName: '',
    phone: '',
    email: '',
    contactMethods: { call: false, text: false, email: false },
    title: '',
    wheels: '',
    mechanical: '',
    odometer: '',
    odometerUnknown: false,
    exteriorDamage: '',
    exteriorParts: '',
    lights: '',
    finalDetails: [],
    noneApply: false,
    comments: ''
  });

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      onNext: handleNext,
      onBack: handleBack,
      vehicleData,
      currentStep,
      totalSteps: STEPS.length,
      mandatory_fill
    };

    switch (STEPS[currentStep].id) {
      case 'zipcode':
        return <ZipcodeStep {...stepProps} />;
      case 'contact':
        return <ContactStep {...stepProps} />;
      case 'title':
        return <TitleStep {...stepProps} />;
      case 'wheels':
        return <WheelsStep {...stepProps} />;
      case 'mechanical':
        return <MechanicalStep {...stepProps} />;
      case 'odometer':
        return <OdometerStep {...stepProps} />;
      case 'exterior-damage':
        return <ExteriorDamageStep {...stepProps} />;
      case 'exterior-parts':
        return <ExteriorPartsStep {...stepProps} />;
      case 'lights':
        return <LightsStep {...stepProps} />;
      case 'final-details':
        return <FinalDetailsStep {...stepProps} />;
      case 'comments':
        return <CommentsStep {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="offer-flow-page">
      <Header />
      <div className="offer-flow">
        <div className="offer-flow__container">
          <div className="offer-flow__toggle">
            <label className="offer-flow__toggle-label">
              <span>Mandatory Fill</span>
              <input
                type="checkbox"
                checked={mandatory_fill}
                onChange={(e) => setMandatoryFill(e.target.checked)}
                className="offer-flow__toggle-input"
              />
              <span className="offer-flow__toggle-slider"></span>
            </label>
          </div>
          <div className="offer-flow__content">
            {renderStep()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OfferFlow;

