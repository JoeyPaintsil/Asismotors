import './WhyChoose.scss';

const perks = [
  {
    title: 'A Decade of Experience',
    text: 'Asismotor has purchased thousands of vehicles since 2009.',
    icon: '🗓️'
  },
  {
    title: 'Licensed, Bonded, Insured',
    text: 'We are a licensed auto dealer. You are protected every step.',
    icon: '🛡️'
  },
  {
    title: 'Highly Rated',
    text: 'Our reputation in customer reviews across the web stays stellar.',
    icon: '⭐'
  },
  {
    title: 'Instant Offers',
    text: 'Get an instant offer for your vehicle in 90 seconds or less.',
    icon: '✉️'
  },
  {
    title: 'Fast Pickups',
    text: 'We can pick up most vehicles in just a couple of business days.',
    icon: '🚚'
  },
  {
    title: 'Guaranteed Payment',
    text: 'We pay by cash or check at pickup time—fully backed payments.',
    icon: '💳'
  }
];

const WhyChoose = () => (
  <section className="why-choose section" id="locations">
    <div className="container">
      <h1>Why Choose Asismotor?</h1>
      <p className="why-choose__subtitle">We pride ourselves on trustworthiness and expertise.</p>
      <div className="why-choose__grid">
        {perks.map((perk) => (
          <article key={perk.title} className="why-card">
            <div className="why-card__icon">{perk.icon}</div>
            <h3>{perk.title}</h3>
            <p>{perk.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChoose;

