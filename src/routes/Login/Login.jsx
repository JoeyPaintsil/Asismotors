import { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import favicon from '../../assets/favicon.png';
import faviconBlack from '../../assets/favicon_black.png';
import './Login.scss';

const Login = () => {
  const [mode, setMode] = useState('signin');

  const isSignIn = mode === 'signin';
  const title = isSignIn ? 'Sign in' : 'Create an account';
  const cta = isSignIn ? 'Sign in with Google' : 'Sign up with Google';
  const emblem = isSignIn ? faviconBlack : favicon;

  return (
    <div className="login-page">
      <Header />
      <main className="login">
        <div className="login__card">
          <img src={emblem} alt="Asismotor logo" className="login__logo" />
          <p className="login__subtitle">
            {isSignIn ? (
              'Welcome back'
            ) : (
              <>
                Join <span className="login__brand-accent">Asismotor</span>
              </>
            )}
          </p>
          <h1>{title}</h1>
          <label htmlFor="login-email" className="login__label">
            Email address
          </label>
          <input id="login-email" type="email" placeholder="you@email.com" />
          <button className="login__continue">Continue</button>
          <div className="login__divider">
            <span>or</span>
          </div>
          <button className="login__google">
            <span className="login__google-icon">G</span>
            {cta}
          </button>
          <p className="login__switch">
            {isSignIn ? 'Don’t have an account?' : 'Already have an account?'}{' '}
            <button type="button" className="login__switch-link" onClick={() => setMode(isSignIn ? 'signup' : 'signin')}>
              {isSignIn ? 'Get started' : 'Sign in'}
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;


