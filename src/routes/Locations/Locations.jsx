import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Locations.scss';

const usStates = [
  'Alabama', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
  'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

const Locations = () => (
  <div className="locations-page">
    <Header />
    <main className="locations">
      <section className="locations__hero">
        <div className="container locations__hero-inner">
          <div>
            <p className="eyebrow">Our Locations</p>
            <h1>We Buy Cars From All Around the USA</h1>
            <p>
              Asismotor purchases vehicles from locations across the United States. 
              Whether you're in a major city or a small town, we're here to help you 
              sell your car quickly and easily.
            </p>
          </div>
        </div>
      </section>

      <section className="locations__list section">
        <div className="container">
          <h2>States We Buy Cars From</h2>
          <p className="locations__subtitle">
            We provide instant quotes and free pickup services in the following states:
          </p>
          <div className="locations__grid">
            {usStates.map((state) => (
              <div key={state} className="locations__state">
                <span className="locations__chevron">›</span>
                <span className="locations__state-name">{state}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="locations__cta">
        <div className="container locations__cta-inner">
          <div>
            <p className="eyebrow">Ready to sell your car?</p>
            <h2>Get an instant quote today, no matter where you are.</h2>
          </div>
          <a href="/#offer" className="locations__cta-button">
            Get Instant Quote
          </a>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Locations;

