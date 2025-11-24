import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getYears,
  getMakesByYear,
  getModelsByYearAndMake,
  getSubmodelsByYearMakeAndModel,
  getTrimsByYearMakeModelAndSubmodel
} from '../../services/carService';
import './OfferForm.scss';

const OfferForm = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('make-model'); // 'make-model' or 'vin'
  const [vin, setVin] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [submodel, setSubmodel] = useState('');
  const [trim, setTrim] = useState('');

  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [submodels, setSubmodels] = useState([]);
  const [trims, setTrims] = useState([]);

  // Load years on mount
  useEffect(() => {
    const loadYears = async () => {
      const data = await getYears();
      setYears(data);
    };
    loadYears();
  }, []);

  // Load makes when year changes
  useEffect(() => {
    const loadMakes = async () => {
      if (year) {
        const data = await getMakesByYear(year);
        setMakes(data);
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
        setModels(data);
      } else {
        setModels([]);
      }
    };
    loadModels();
  }, [year, make]);

  // Load submodels when year, make, and model change
  useEffect(() => {
    const loadSubmodels = async () => {
      if (year && make && model) {
        const data = await getSubmodelsByYearMakeAndModel(year, make, model);
        setSubmodels(data);
      } else {
        setSubmodels([]);
      }
    };
    loadSubmodels();
  }, [year, make, model]);

  // Load trims when year, make, model, and submodel change
  useEffect(() => {
    const loadTrims = async () => {
      if (year && make && model && submodel) {
        const data = await getTrimsByYearMakeModelAndSubmodel(year, make, model, submodel);
        setTrims(data);
      } else {
        setTrims([]);
      }
    };
    loadTrims();
  }, [year, make, model, submodel]);

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
    setMake('');
    setModel('');
    setSubmodel('');
    setTrim('');
  };

  const handleMakeChange = (e) => {
    const newMake = e.target.value;
    setMake(newMake);
    setModel('');
    setSubmodel('');
    setTrim('');
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    setSubmodel('');
    setTrim('');
  };

  const handleSubmodelChange = (e) => {
    const newSubmodel = e.target.value;
    setSubmodel(newSubmodel);
    setTrim('');
  };

  const handleTrimChange = (e) => {
    setTrim(e.target.value);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    // Reset all form fields when switching modes
    setYear('');
    setMake('');
    setModel('');
    setSubmodel('');
    setTrim('');
    setVin('');
  };

  // Get all available trims (combining submodel and trim for display)
  const availableTrims = trims.length > 0 ? trims : [];

  const handleGetOffer = () => {
    const vehicleData = {
      mode,
      vin: mode === 'vin' ? vin : null,
      year: mode === 'make-model' ? year : null,
      make: mode === 'make-model' ? make : null,
      model: mode === 'make-model' ? model : null,
      submodel: mode === 'make-model' ? submodel : null,
      trim: mode === 'make-model' ? trim : null
    };

    navigate('/offer-flow', { state: { vehicleData } });
  };

  return (
    <div className="offer-card">
      <div className="offer-card__tabs">
        <button
          type="button"
          className={`offer-card__tab ${mode === 'make-model' ? 'is-active' : ''}`}
          onClick={() => handleModeChange('make-model')}
        >
          MAKE & MODEL
        </button>
        <button
          type="button"
          className={`offer-card__tab ${mode === 'vin' ? 'is-active' : ''}`}
          onClick={() => handleModeChange('vin')}
        >
          PLATE OR VIN
        </button>
      </div>
      <div className="offer-card__form">
        {mode === 'make-model' ? (
          <>
            <label>
              <select value={year} onChange={handleYearChange}>
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select value={make} onChange={handleMakeChange} disabled={!year}>
                <option value="">Make</option>
                {makes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <select value={model} onChange={handleModelChange} disabled={!make}>
                <option value="">Model</option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            {submodels.length > 0 && (
              <label>
                <select value={submodel} onChange={handleSubmodelChange} disabled={!model}>
                  <option value="">Submodel</option>
                  {submodels.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {availableTrims.length > 0 && (
              <label>
                <select value={trim} onChange={handleTrimChange} disabled={!submodel}>
                  <option value="">Trim</option>
                  {availableTrims.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </>
        ) : (
          <label>
            <input
              type="text"
              value={vin}
              onChange={(e) => setVin(e.target.value.toUpperCase())}
              placeholder="Enter VIN or Plate Number"
              maxLength={17}
            />
          </label>
        )}
        <button type="button" className="offer-card__button" onClick={handleGetOffer}>
          GET AN INSTANT OFFER
          <span className="offer-card__button-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default OfferForm;

