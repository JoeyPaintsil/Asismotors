import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './About.scss';

const storyPanels = [
  {
    title: 'Neighbors first, dependable always',
    text: 'We launched As-is Motor from a single driveway in Cumming, GA helping neighbors sell cars the same day. Word spread because we show up when we say we will, keep every promise in writing, and treat every pickup like helping a friend.',
    image: 'https://img.freepik.com/premium-photo/tow-truck-public-road-tow-truck-with-broken-car-country-road-tow-truck-transporting-car-highway-car-service-transportation-concept_782515-6725.jpg'
  },
  {
    title: 'Instant offers powered by live market data',
    text: 'Our valuation engine pulls comparable wholesale sales, local buyer demand, and reconditioning costs in real time. That is how we make solid offers that never change when the truck arrives.',
    image: 'data:image/jpeg;base64,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'
  },
  {
    title: 'People-first pickup experience',
    text: 'Every As-is Motor buyer is background-checked and trained to handle paperwork, titles, and even tricky DMV scenarios. We tow for free, pay on the spot, and update you by text the whole way.',
    image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=900&q=80'
  }
];

const stats = [
  { label: 'Cars purchased', value: '1000+' },
  { label: 'Free pickups per week', value: '15+' },
  { label: 'Average payout time', value: '23 mins' }
];

const About = () => (
  <div className="about-page">
    <Header />
    <main className="about">
      <section className="about__hero">
        <div className="container about__hero-inner">
          <div>
            <p className="eyebrow">About As-is Motor</p>
            <h1>We help drivers move on faster.</h1>
            <p>
              As-is Motor is a team of car buyers, pricing analysts, and support specialists obsessed with making it easy
              to sell any vehicle for top dollar—without dealerships or lowball offers.
            </p>
            <div className="about__stat-row">
              {stats.map((stat) => (
                <article key={stat.label}>
                  <span>{stat.value}</span>
                  <p>{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80"
            alt="As-is Motor team celebrating"
          />
        </div>
      </section>

      <section className="about__story section">
        <div className="container">
          <h2>Built for transparency and speed</h2>
          <div className="about__story-grid">
            {storyPanels.map((panel, index) => (
              <article key={panel.title} className={index % 2 ? 'is-reversed' : ''}>
                <img src={panel.image} alt={panel.title} />
                <div>
                  <h3>{panel.title}</h3>
                  <p>{panel.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about__cta">
        <div className="container about__cta-inner">
          <div>
            <p className="eyebrow">Need to sell fast?</p>
            <h2>Tell us about your car and get a guaranteed offer in minutes.</h2>
          </div>
          <a href="/#offer" className="about__cta-button">
            Start my offer
          </a>
        </div>
      </section>

      <section className="about__values section">
        <div className="container about__values-inner">
          <div>
            <p className="eyebrow">Our promise</p>
            <h2>We treat every car like it belongs to family.</h2>
            <p>That means clean communication, guaranteed quotes, and support that does not disappear after pickup.</p>
          </div>
          <ul>
            <li>Transparent pricing backed by live data</li>
            <li>Respect for your time—average visit under 15 minutes</li>
            <li>Paperwork handled start to finish, even without a title</li>
          </ul>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
