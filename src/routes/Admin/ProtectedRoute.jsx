import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
  
  return isLoggedIn ? children : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;

