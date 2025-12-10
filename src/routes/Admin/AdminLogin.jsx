import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.scss';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Demo login - any username/password works
    if (username.trim() && password.trim()) {
      // Store admin session
      sessionStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login">
        <div className="admin-login__card">
          <h1 className="admin-login__title">Admin Login</h1>
          <p className="admin-login__subtitle">Enter your credentials to access the admin dashboard</p>
          
          <form onSubmit={handleSubmit} className="admin-login__form">
            {error && <div className="admin-login__error">{error}</div>}
            
            <div className="admin-login__field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="admin-login__field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="admin-login__button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

