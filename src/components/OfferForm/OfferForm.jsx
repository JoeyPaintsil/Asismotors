import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getYears,
  getMakesByYear,
  getModelsByYearAndMake,
} from '../../services/excelCarService';
import SearchableSelect from './SearchableSelect';
import './OfferForm.scss';

const OfferForm = () => {
  const navigate = useNavigate();
  
  // Vehicle Information - User can either enter VIN OR select Year/Make/Model
  const [vin, setVin] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const [error, setError] = useState(null);

  // Dropdown data
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  // Load years on mount
  useEffect(() => {
    const loadYears = async () => {
      try {
        const data = await getYears();
        setYears(data);
      } catch (error) {
        console.error('Error loading years:', error);
        setError('Failed to load vehicle data. Please refresh the page.');
      }
    };
    loadYears();
  }, []);

  // Load makes when year changes
  useEffect(() => {
    const loadMakes = async () => {
      if (year) {
        try {
          const data = await getMakesByYear(year);
          setMakes(data);
        } catch (error) {
          console.error('Error loading makes:', error);
          setMakes([]);
        }
      } else {
        setMakes([]);
        setMake(''); // Clear make when year is cleared
      }
    };
    loadMakes();
  }, [year]);

  // Load models when year and make change
  useEffect(() => {
    const loadModels = async () => {
      if (year && make) {
        try {
          const data = await getModelsByYearAndMake(year, make);
          setModels(data);
        } catch (error) {
          console.error('Error loading models:', error);
          setModels([]);
        }
      } else {
        setModels([]);
        setModel(''); // Clear model when make is cleared
      }
    };
    loadModels();
  }, [year, make]);

  // Clear make and model when year changes, and clear VIN when Year/Make/Model is selected
  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
    if (newYear) {
      setVin(''); // Clear VIN when Year is selected
    }
    if (!newYear) {
      setMake('');
      setModel('');
    }
  };

  // Clear model when make changes, and clear VIN when Make is selected
  const handleMakeChange = (e) => {
    const newMake = e.target.value;
    setMake(newMake);
    if (newMake) {
      setVin(''); // Clear VIN when Make is selected
    }
    if (!newMake) {
      setModel('');
    }
  };

  // Clear VIN when model is selected
  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    if (newModel) {
      setVin(''); // Clear VIN when Model is selected
    }
  };

  const handleGetOffer = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate: Either VIN OR Year/Make/Model must be provided
    const hasVin = vin.trim().length > 0;
    const hasYearMakeModel = year && make && model;

    if (!hasVin && !hasYearMakeModel) {
      setError('Please either enter a VIN or select Year, Make, and Model.');
      return;
    }

    // Navigate to OfferFlow with vehicle data
    navigate('/offer-flow', {
      state: {
        vehicleData: {
          vin: vin.trim() || '',
          year: year || '',
          makeCode: make || '',
          model: model || '',
        }
      }
    });
  };

  return (
    <div className="offer-card">
      <div className="offer-card__header">
        <h2 className="offer-card__title">Get Your Instant Quote</h2>
        <p className="offer-card__subtitle">Fill out the form below to get started.</p>
      </div>
      <form className="offer-card__form" onSubmit={handleGetOffer}>
        <label>
          Enter VIN
          <input
            type="text"
            value={vin}
            onChange={(e) => {
              setVin(e.target.value.toUpperCase());
              // Clear Year/Make/Model when VIN is entered
              if (e.target.value.trim().length > 0) {
                setYear('');
                setMake('');
                setModel('');
              }
            }}
            placeholder="Enter VIN (17 characters)"
            maxLength={17}
          />
        </label>

        <p style={{ textAlign: 'center', margin: '1rem 0', fontWeight: 'bold' }}>
          OR select Year, Make, Model
        </p>

        <label>
          Year
          <SearchableSelect
            options={years}
            value={year}
            onChange={(selectedYear) => {
              handleYearChange({ target: { value: selectedYear } });
            }}
            placeholder="Select Year"
          />
        </label>

        <label>
          Make
          <SearchableSelect
            options={makes}
            value={make}
            onChange={(selectedMake) => {
              handleMakeChange({ target: { value: selectedMake } });
            }}
            placeholder={year ? 'Select Make' : 'Select Year first'}
            disabled={!year}
            getDisplayText={(option) => {
              // Display without quotes, but keep original value (with quotes) for API
              return option.startsWith("'") && option.endsWith("'")
                ? option.slice(1, -1)
                : option;
            }}
          />
        </label>

        <label>
          Model
          <SearchableSelect
            options={models}
            value={model}
            onChange={(selectedModel) => {
              handleModelChange({ target: { value: selectedModel } });
            }}
            placeholder={make ? 'Select Model' : 'Select Make first'}
            disabled={!make}
            getDisplayText={(option) => {
              // Display without quotes, but keep original value (with quotes) for API
              return option.startsWith("'") && option.endsWith("'")
                ? option.slice(1, -1)
                : option;
            }}
          />
        </label>

        {error && (
          <div className="offer-card__error">
            Error: {error}
          </div>
        )}

        <button type="submit" className="offer-card__button">
          Get Instant Quote!
          <span className="offer-card__button-icon">⚡</span>
        </button>
      </form>
    </div>
  );
};

export default OfferForm;

