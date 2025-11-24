import './Steps.scss';

const steps = [
  {
    title: 'Get an Offer to Sell Your Car',
    text: 'Answer a few quick questions. Get a guaranteed offer in minutes.',
    icon: 'https://cdn-icons-png.flaticon.com/512/942/942748.png'
  },
  {
    title: 'Set a Pickup Time',
    text: 'Free towing is included with every offer. We pick up when it works for you.',
    icon: 'https://cdn-icons-png.flaticon.com/128/4833/4833895.png'
  },
  {
    title: 'Get Cash For Cars',
    text: 'We pay on the spot when we pick up. We handle the paperwork too.',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png'
  }
];

const Steps = () => (
  <section className="steps section">
    <div className="container">
      <h1>3 Easy Steps to Sell Your Car For Cash Anywhere</h1>
      <div className="steps__grid">
        {steps.map((step) => (
          <article key={step.title} className="step-card">
            <div className="step-card__icon">
              <img src={step.icon} alt={step.title} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Steps;

