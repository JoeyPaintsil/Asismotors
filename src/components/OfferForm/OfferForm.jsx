import { useState, useEffect } from 'react';
import {
  getYears,
  getMakesByYear,
  getModelsByYearAndMake,
} from '../../services/carService';
import { getInstaQuote } from '../../services/copartService';
import './OfferForm.scss';

const OfferForm = () => {
  // Vehicle Information - Pre-filled with example data for testing
  const [vin, setVin] = useState('5TEWN72N23Z207542');
  const [year, setYear] = useState('2010');
  const [make, setMake] = useState('Audi');
  const [model, setModel] = useState('Accord');
  const [odometerReading, setOdometerReading] = useState('105235');
  const [odometerBrand, setOdometerBrand] = useState('Inaccessible');

  // Damage Information
  const [lossType, setLossType] = useState('H');
  const [primaryPointOfImpact, setPrimaryPointOfImpact] = useState('RR');

  // Valuation
  const [acv, setAcv] = useState('200');
  const [repairCost, setRepairCost] = useState('1000');

  // Condition
  const [drivable, setDrivable] = useState('Y');
  const [drivabilityRating, setDrivabilityRating] = useState('S');
  const [titleCategory, setTitleCategory] = useState('Bill of Sale');

  // Location
  const [postalCode, setPostalCode] = useState('98338');

  // Optional
  const [claimNumber, setClaimNumber] = useState('000608216063');

  // API Response
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dropdown data
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  // Load years on mount
  useEffect(() => {
    const loadYears = async () => {
      const data = await getYears();
      // Ensure 2010 is in the list for testing, and sort descending
      const yearsSet = new Set(data);
      yearsSet.add('2010');
      const yearsList = Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a));
      setYears(yearsList);
    };
    loadYears();
  }, []);

  // Load makes when year changes
  useEffect(() => {
    const loadMakes = async () => {
      if (year) {
        const data = await getMakesByYear(year);
        // Ensure "Audi" is in the list for testing
        const makesList = data.includes('Audi') ? data : [...data, 'Audi'];
        setMakes(makesList);
      } else {
        setMakes([]);
      }
    };
    loadMakes();
  }, [year]);

  // Load models when year and make change
  useEffect(() => {
    const loadModels = async () => {
      if (year && make) {
        const data = await getModelsByYearAndMake(year, make);
        // Ensure "Accord" is in the list for testing (even though it's a Honda model, not Audi)
        // But we'll add it anyway for the example
        const modelsList = data.includes('Accord') ? data : [...data, 'Accord'];
        setModels(modelsList);
      } else {
        setModels([]);
      }
    };
    loadModels();
  }, [year, make]);

  const handleGetOffer = async (e) => {
    e.preventDefault();
    setError(null);
    setApiResponse(null);
    setLoading(true);

    try {
      // Prepare form data for API
      const formData = {
        vin: vin.trim(),
        year: year,
        makeCode: make, // Using make as makeCode
        model: model,
        odometerReading: odometerReading,
        odometerBrand: odometerBrand,
        lossType: lossType,
        primaryPointOfImpact: primaryPointOfImpact,
        acv: acv,
        repairCost: repairCost,
        drivable: drivable,
        drivabilityRating: drivabilityRating,
        titleCategory: titleCategory,
        postalCode: postalCode.trim(),
        claimNumber: claimNumber.trim() || '',
      };

      // Call Copart API
      const response = await getInstaQuote(formData);
      
      // Log to console
      console.log('Copart API Response:', response);
      
      // Set response to display
      setApiResponse(response);
    } catch (err) {
      console.error('Error getting quote:', err);
      setError(err.message || 'Failed to get quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="offer-card">
      <form className="offer-card__form" onSubmit={handleGetOffer}>
        <h3 className="offer-card__section-title">Vehicle Information</h3>
        
        <label>
          VIN
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            placeholder="Enter VIN"
            maxLength={17}
            required
          />
        </label>

        <label>
          Year
          <select 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            required
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <label>
          Make
          <select value={make} onChange={(e) => setMake(e.target.value)} disabled={!year} required>
            <option value="">Select Make</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label>
          Model
          <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!make} required>
            <option value="">Select Model</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label>
          Odometer Reading
          <input
            type="number"
            value={odometerReading}
            onChange={(e) => setOdometerReading(e.target.value)}
            placeholder="Enter odometer reading"
            min="0"
            required
          />
        </label>

        <label>
          Odometer Brand
          <select value={odometerBrand} onChange={(e) => setOdometerBrand(e.target.value)} required>
            <option value="">Select Odometer Brand</option>
            <option value="Actual">Actual</option>
            <option value="Not Actual">Not Actual</option>
            <option value="Inaccessible">Inaccessible</option>
          </select>
        </label>

        <h3 className="offer-card__section-title">Damage Information</h3>

        <label>
          Loss Type
          <select value={lossType} onChange={(e) => setLossType(e.target.value)} required>
            <option value="">Select Loss Type</option>
            <option value="H">H</option>
            <option value="C">C</option>
            <option value="F">F</option>
            <option value="T">T</option>
            <option value="W">W</option>
            <option value="O">O</option>
          </select>
        </label>

        <label>
          Primary Point of Impact
          <select value={primaryPointOfImpact} onChange={(e) => setPrimaryPointOfImpact(e.target.value)} required>
            <option value="">Select Point of Impact</option>
            <option value="FR">FR (Front Right)</option>
            <option value="RR">RR (Rear Right)</option>
            <option value="LF">LF (Left Front)</option>
            <option value="RF">RF (Right Front)</option>
            <option value="LR">LR (Left Rear)</option>
            <option value="RL">RL (Right Left)</option>
            <option value="F">F (Front)</option>
            <option value="R">R (Rear)</option>
            <option value="L">L (Left)</option>
            <option value="RT">RT (Right)</option>
            <option value="T">T (Top)</option>
            <option value="U">U (Under)</option>
            <option value="N">N (None)</option>
          </select>
        </label>

        <h3 className="offer-card__section-title">Valuation</h3>

        <label>
          ACV (Actual Cash Value)
          <input
            type="number"
            value={acv}
            onChange={(e) => setAcv(e.target.value)}
            placeholder="Enter ACV"
            min="0"
            step="0.01"
            required
          />
        </label>

        <label>
          Repair Cost
          <input
            type="number"
            value={repairCost}
            onChange={(e) => setRepairCost(e.target.value)}
            placeholder="Enter repair cost"
            min="0"
            step="0.01"
            required
          />
        </label>

        <h3 className="offer-card__section-title">Vehicle Condition</h3>

        <label>
          Drivable
          <select value={drivable} onChange={(e) => setDrivable(e.target.value)} required>
            <option value="">Select</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </label>

        <label>
          Drivability Rating
          <select value={drivabilityRating} onChange={(e) => setDrivabilityRating(e.target.value)} required>
            <option value="">Select Drivability Rating</option>
            <option value="S">S</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </label>

        <label>
          Title Category
          <select value={titleCategory} onChange={(e) => setTitleCategory(e.target.value)} required>
            <option value="">Select Title Category</option>
            <option value="Bill of Sale">Bill of Sale</option>
            <option value="Certificate of Title">Certificate of Title</option>
            <option value="Salvage Title">Salvage Title</option>
            <option value="Rebuilt Title">Rebuilt Title</option>
            <option value="Clean Title">Clean Title</option>
            <option value="Lienholder Title">Lienholder Title</option>
            <option value="Duplicate Title">Duplicate Title</option>
            <option value="No Title">No Title</option>
          </select>
        </label>

        <h3 className="offer-card__section-title">Location</h3>

        <label>
          Postal Code
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code"
            required
          />
        </label>

        <h3 className="offer-card__section-title">Optional</h3>

        <label>
          Claim Number (Optional)
          <input
            type="text"
            value={claimNumber}
            onChange={(e) => setClaimNumber(e.target.value)}
            placeholder="Enter claim number"
          />
        </label>

        {error && (
          <div className="offer-card__error">
            Error: {error}
          </div>
        )}

        <button type="submit" className="offer-card__button" disabled={loading}>
          {loading ? 'GETTING QUOTE...' : 'GET AN INSTANT OFFER'}
          {!loading && <span className="offer-card__button-arrow">→</span>}
        </button>

        {apiResponse && (
          <div className="offer-card__response">
            <h3 className="offer-card__response-title">Copart API Response</h3>
            <pre className="offer-card__response-content">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default OfferForm;

