import './OfferForm.scss';

const years = ['2025', '2024', '2023', '2022'];
const makes = ['Honda', 'Toyota', 'Ford', 'Chevy'];
const models = ['Civic', 'Camry', 'F-150', 'Malibu'];

const OfferForm = () => (
  <div className="offer-card">
    <h3>Get your instant offer</h3>
    <div className="offer-card__form">
      <label>
        <span>Year</span>
        <select defaultValue="">
          <option value="" disabled>
            Choose year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Make</span>
        <select defaultValue="">
          <option value="" disabled>
            Choose make
          </option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Model</span>
        <select defaultValue="">
          <option value="" disabled>
            Choose model
          </option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </label>
      <button type="button">Get Offer!</button>
    </div>
  </div>
);

export default OfferForm;

