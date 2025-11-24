import faqImage from '../../assets/faq-illustration.png';
import './Faq.scss';

const faqs = [
  {
    q: 'Can I sell my car today?',
    a: 'Yes. Get an instant online offer and schedule pick up as soon as today, often within a few hours.'
  },
  {
    q: 'Where does Asis Motors buy cars?',
    a: 'We buy cars nationwide in all 50 states with free towing in every metro area.'
  },
  {
    q: 'Can I sell my car without a title?',
    a: 'Some states allow alternative documentation. Our specialists will walk you through what’s needed.'
  },
  {
    q: 'Do you buy wrecked cars?',
    a: 'Absolutely. We purchase damaged, non-running, or totaled vehicles every day.'
  },
  {
    q: 'Is towing my vehicle free?',
    a: 'Yes, all offers include free towing scheduled at a time that works for you.'
  }
];

const Faq = () => (
  <section className="faq section" id="faq">
    <div className="container faq__inner">
      <div className="faq__visual">
        <img src={faqImage} alt="Customer asking car questions" />
      </div>
      <div className="faq__content">
        <h2>Frequently Asked Questions</h2>
        <p className="faq__subtitle">
          Got questions? We have answers. Learn how Asis Motors makes selling your car fast and hassle-free.
        </p>
        <div className="faq__list">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Faq;

