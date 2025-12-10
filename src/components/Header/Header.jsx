import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import navLinks from '../../constants/navLinks';
import useNavigationHandler from '../../hooks/useNavigationHandler';
import './Header.scss';

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = useNavigationHandler();

  const onNavClick = (event, link) => {
    event.preventDefault();
    setOpen(false);
    handleNavigation(link);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__inner container">
        <a href="/" onClick={handleLogoClick} className="header__brand">
          <img className="header__logo" src={logo} alt="As-is Motor logo" />
          <div className="header__logo-text">
            As-is Motor
          </div>
        </a>

        <nav className={`header__nav ${open ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path || `/#${link.sectionId}`}
              onClick={(event) => onNavClick(event, link)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={`header__toggle ${open ? 'is-active' : ''}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;

