import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './HowItWorks.scss';

const heroImage = 'https://media.istockphoto.com/id/1423325870/pt/foto/tow-truck-transportation.jpg?s=612x612&w=0&k=20&c=2M54G0J_A-nip1Rgnps6M24ypKv8o9C4CmszlkiIGX8=';

const journeySections = [
  {
    title: 'Tell us about your ride',
    text: 'Share your car model or VIN alongside few deatails about your car. Our pricing engine checks live wholesale auctions, local demand, and seasonality to calculate the strongest guaranteed offer in minutes.',
    image: 'https://t3.ftcdn.net/jpg/02/90/26/36/240_F_290263646_5oTJ4qBHO9XuQ8cEaZDh63IRVXCopZpk.jpg'
  },
  {
    title: 'Lock in pickup on your schedule',
    text: 'Pick a time that works—even same day. A verified Asis Motors field agent meets you anywhere (home, office, storage) with paperwork in hand and free towing already included.',
    image: 'schedule_meeting.jpg'
  },
  {
    title: 'Hand off keys, get paid instantly',
    text: 'We pay the agreed amount on the spot with digital transfer or cashier’s check before the truck pulls away. No renegotiations, no surprise fees.',
    image: 'https://www.npchevy.com/blogs/7362/wp-content/uploads/2022/04/515ab308c84e4371b53ee33d676e6b62-1536x1024.jpg'
  }
];

const perks = [
  { title: 'Real-time offers', detail: 'Prices update every 15 minutes with live market data.' },
  { title: 'Paperwork handled', detail: 'We manage title transfer and DMV filings for every state.' },
  { title: 'All conditions welcome', detail: 'Clean, salvaged, or totaled—we have a buyer lined up.' }
];

const HowItWorks = () => (
  <div className="how-page">
    <Header />
    <main className="how">
      <section className="how__hero">
        <div className="container how__hero-inner">
          <div>
            <p className="eyebrow">How Asis Motors Works</p>
            <h1>Instant offers. Doorstep pickup. Cash before the tow truck leaves.</h1>
            <p>
              Skip listings and strangers. Asis Motors pairs smart pricing tech with real humans who pick up your car,
              complete the paperwork, and pay you immediately.
            </p>
            <a href="/#offer" className="how__cta">
              Get my instant offer
            </a>
          </div>
          <img src={heroImage} alt="Driver handing off keys" />
        </div>
      </section>

      <section className="how__journey section">
        <div className="container">
          <h2>Your three-step journey</h2>
          <div className="journey">
            {journeySections.map((section, index) => (
              <article key={section.title} className={`journey__item ${index % 2 === 1 ? 'is-reversed' : ''}`}>
                <img src={section.image} alt={section.title} />
                <div>
                  <p className="journey__step">{`Step ${index + 1}`}</p>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="how__perks section">
        <div className="container how__perks-inner">
          <div>
            <h2>Why drivers trust Asis Motors</h2>
            <p>We have purchased many vehicles nationwide with many five-star reviews.</p>
          </div>
          <div className="perks-grid">
            {perks.map((perk) => (
              <article key={perk.title}>
                <h4>{perk.title}</h4>
                <p>{perk.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="how__cta-banner">
        <div className="container how__cta-content">
          <div>
            <p className="eyebrow">Ready to sell?</p>
            <h2>Answer a few questions to see your guaranteed cash offer.</h2>
            <p>Average pickup time is under 24 hours in most cities.</p>
          </div>
          <a href="/#offer" className="how__cta how__cta--light">
            Start now
          </a>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default HowItWorks;


