import heroImage from '../../assets/cash for car.png';
import OfferForm from '../OfferForm/OfferForm';
import './Hero.scss';

const Hero = () => (
  <section className="hero" id="offer">
    <div className="hero__bg" />
    <div className="hero__inner container">
      <div className="hero__grid">
        <div className="hero__left">
          <div className="hero__copy">
            <p className="hero__eyebrow">Get Quick Cash For Your Car</p>
            <h1>Sell your car ASAP </h1>
            <p className="hero__text">
                With Asis Motors, you can sell you car instantly for quick cash. No need 
                to worry about deliverying your car. We tow your car away completely free!!
                No hassle, no stress, just quick cash in your pocket. Get an <b>instant</b> offer for your car today!
                <br></br>Call{' '}
              <a href="tel:678-456-8732" className="hero__phone">
                (678) 456-8732
              </a>
            </p>
            <div className="hero__contact">
              {/* <span className="hero__contact-icon">☎</span>
              <span>Live offer experts 7 days a week</span> */}
            </div>
          </div>

          <div className="hero__illustration">
            <img src={heroImage} alt="Cash for cars illustration" />
          </div>
        </div>

        <div className="hero__form-wrapper">
          <OfferForm />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;

