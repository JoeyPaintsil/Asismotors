import './ProgressBar.scss';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;

