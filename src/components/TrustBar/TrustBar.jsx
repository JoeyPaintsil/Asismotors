import './TrustBar.scss';

const TrustBar = () => (
  <section className="trust-bar section">
    <div className="container trust-bar__inner">
      <p>
        Our customers say <strong>Excellent</strong>
      </p>
      <div className="trust-bar__stars">
        {[...Array(5)].map((_, idx) => (
          <span key={idx}>★</span>
        ))}
        <span className="trust-bar__rating">5/5</span>
      </div>
      <div className="trust-bar__badges">
        <a
          href="https://www.google.com/maps/contrib/1122334455/reviews"
          target="_blank"
          rel="noreferrer"
          className="trust-bar__google"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google icon"
            width="16"
            height="16"
          />
          <span>Google Reviews</span>
        </a>
      </div>
      <p className="trust-bar__pill">Secure · Reliable · Trusted</p>
    </div>
  </section>
);

export default TrustBar;

