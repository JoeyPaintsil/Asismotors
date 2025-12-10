import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import About from './routes/About/About';
import Contact from './routes/Contact/Contact';
import Home from './routes/Home/Home';
import HowItWorks from './routes/HowItWorks/HowItWorks';
import Login from './routes/Login/Login';
import Locations from './routes/Locations/Locations';
import OfferFlow from './routes/OfferFlow/OfferFlow';
import OfferDisplay from './routes/OfferDisplay/OfferDisplay';
import LockInOffer from './routes/LockInOffer/LockInOffer';
import AdminLogin from './routes/Admin/AdminLogin';
import AdminDashboard from './routes/Admin/AdminDashboard';
import ProtectedRoute from './routes/Admin/ProtectedRoute';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/login" element={<Login />} />
      <Route path="/offer-flow" element={<OfferFlow />} />
      <Route path="/offer-display" element={<OfferDisplay />} />
      <Route path="/lock-in-offer" element={<LockInOffer />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  </BrowserRouter>
);

export default App;
