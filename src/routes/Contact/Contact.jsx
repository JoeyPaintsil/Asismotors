import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Contact.scss';

const Contact = () => (
  <div className="contact-page">
    <Header />
    <main className="contact">
      <section className="contact__hero">
        <div className="container contact__hero-inner">
          <div className="contact__hero-copy">
            <p className="eyebrow">Contact Asis Motors</p>
            <h1>Talk to a real offer specialist any time.</h1>
            <p>
              Call, text, or email us for paperwork help, pickup updates, or large fleet quotes. Our average response
              time is under 10 minutes during business hours.
            </p>
            <div className="contact__channels">
              <a href="tel:678-456-8732">
                <span>Call / Text</span>
                <strong>(678) 456-8732</strong>
              </a>
              <a href="mailto:info@asismotors.com">
                <span>Email</span>
                <strong>info@asismotors.com</strong>
              </a>
            </div>
          </div>
          <img
            src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Asis Motors support team"
          />
        </div>
      </section>

      <section className="contact__details section">
        <div className="container contact__details-grid">
          <article>
            <p className="contact__label">Visit</p>
            <h3>Pickups + walk-ins</h3>
            <p>110 Samaritan Drive, Cumming, GA 30040</p>
            <p>Mon – Sat · 8:00a – 8:00p ET</p>
          </article>
          <article>
            <p className="contact__label">Fleet + dealership</p>
            <h3>Looking to sell multiple cars?</h3>
            <p>Email info@asismotors.com for wholesale offers and guaranteed transport.</p>
          </article>
          <article>
            <p className="contact__label">Concierge pickup</p>
            <h3>No title or bank lien?</h3>
            <p>Our concierge team can pull payoff letters, replace missing documents, and coordinate towing in every state.</p>
          </article>
        </div>
      </section>

      <section className="contact__form">
        <div className="container contact__form-inner">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
            alt="Customer handing off car keys"
          />
          <form>
            <h2>Tell us about your car.</h2>
            <p>Send a quick message and an offer specialist will follow up with your guaranteed price.</p>
            <div className="form-row">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" placeholder="Jane Doe" />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" placeholder="you@email.com" />
            </div>
            <div className="form-row">
              <label htmlFor="phone">Phone number</label>
              <input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
            </div>
            <div className="form-row">
              <label htmlFor="vehicle">Vehicle details</label>
              <textarea
                id="vehicle"
                name="vehicle"
                rows="4"
                placeholder="2018 Honda Accord EX-L, 86k miles, clean title"
              />
            </div>
            <button type="button">Request my offer</button>
          </form>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Contact;


