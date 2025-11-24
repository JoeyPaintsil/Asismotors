import { useState } from 'react';
import logo from '../../assets/logo.png';
import './Header.scss';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Locations', href: '#locations' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Log In', href: '#login' }
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner container">
        <div className="header__brand">
          <img className="header__logo" src={logo} alt="Aziz Motors logo" />
          <div className="header__logo-text">
            <span>Aziz</span> Motors
          </div>
        </div>

        <nav className={`header__nav ${open ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
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

