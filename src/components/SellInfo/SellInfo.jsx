import './SellInfo.scss';

const points = [
  {
    title: 'Top Cash Offers',
    description:
      'Maximize your sale price and join our 200,000 customers. Get an offer online to sell your car within minutes.'
  },
  {
    title: 'Avoid The Dealership',
    description:
      'Sell without the hassle of negotiating trade-ins. We buy cars directly, so there’s no dealer pressure.'
  },
  {
    title: 'No Stacks of Paperwork',
    description:
      'Skip DMV lines and multi-page forms. We handle every bit of the paperwork for free when you sell to us.'
  },
  {
    title: 'We Buy Cars Nationwide',
    description:
      'Wondering “Who buys cars near me?” We do—coast to coast. Get a guaranteed cash offer wherever you are.'
  },
  {
    title: 'Cash For Cars',
    description:
      'Selling your car with Asismotor is fast because we can pay cash on the spot with one simple phone call.'
  }
];

const SellInfo = () => (
  <section className="sell-info section" id="how-it-works">
    <div className="container sell-info__inner">
      <div className="sell-info__highlight">
        <h1>How to Sell Your Car Online Fast</h1>
        <p className="sell-info__tagline">Asismotor is the fastest way to sell your car anywhere.</p>
        <span className="sell-info__accent" />
      </div>
      <div className="sell-info__list">
        <span className="sell-info__line" />
        <div className="sell-info__items">
          {points.map((item) => (
            <p key={item.title}>
              <strong>{item.title}:</strong> {item.description}
            </p>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SellInfo;

