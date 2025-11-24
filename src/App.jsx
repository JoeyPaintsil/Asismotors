import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './routes/About/About';
import Contact from './routes/Contact/Contact';
import Home from './routes/Home/Home';
import HowItWorks from './routes/HowItWorks/HowItWorks';
import Login from './routes/Login/Login';
import OfferFlow from './routes/OfferFlow/OfferFlow';
import OfferDisplay from './routes/OfferDisplay/OfferDisplay';
import LockInOffer from './routes/LockInOffer/LockInOffer';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/offer-flow" element={<OfferFlow />} />
      <Route path="/offer-display" element={<OfferDisplay />} />
      <Route path="/lock-in-offer" element={<LockInOffer />} />
    </Routes>
  </BrowserRouter>
);

export default App;
