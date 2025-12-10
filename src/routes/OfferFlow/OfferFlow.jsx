import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import QuestionStep from './steps/QuestionStep';
import ZipcodeStep from './steps/ZipcodeStep';
import ContactStep from './steps/ContactStep';
import QuoteStep from './steps/QuoteStep';
import { questions } from '../../data/questions';
import './OfferFlow.scss';

const OfferFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicleData = location.state?.vehicleData || {};

  // Calculate total steps: questions + zipcode + contact + quote
  const totalSteps = questions.length + 3; // questions + zipcode + contact + quote
  
  const [currentStep, setCurrentStep] = useState(0);
  const [mandatory_fill, setMandatoryFill] = useState(false);
  
  // Store answers for all questions
  const [answers, setAnswers] = useState({});
  
  // Zipcode
  const [zipcode, setZipcode] = useState('');
  
  // Contact info
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    phone: '',
    email: '',
    contactMethods: { call: false, text: false, sms: false }
  });

  // Update answer for a specific question
  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
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
    // Show questions one by one
    if (currentStep < questions.length) {
      const question = questions[currentStep];
      // For textarea questions, always start with empty string
      const answer = question.type === 'textarea' ? '' : (answers[question.id] || '');
      const isLastQuestion = currentStep === questions.length - 1;
      
      return (
        <QuestionStep
          question={question}
          answer={answer}
          onAnswer={(answer) => handleAnswer(question.id, answer)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
          mandatory_fill={mandatory_fill}
          isLastQuestion={isLastQuestion}
        />
      );
    }
    
    // Show zipcode step (after all questions)
    if (currentStep === questions.length) {
      return (
        <ZipcodeStep
          formData={{ zipcode }}
          updateFormData={(data) => setZipcode(data.zipcode || '')}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
          mandatory_fill={mandatory_fill}
        />
      );
    }
    
    // Show contact info step
    if (currentStep === questions.length + 1) {
      return (
        <ContactStep
          formData={contactInfo}
          updateFormData={setContactInfo}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
          mandatory_fill={mandatory_fill}
        />
      );
    }
    
    // Show quote step (final step)
    if (currentStep === questions.length + 2) {
      return (
        <QuoteStep
          vehicleData={vehicleData}
          answers={answers}
          zipcode={zipcode}
          contactInfo={contactInfo}
          onBack={handleBack}
        />
      );
    }
    
    return null;
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
