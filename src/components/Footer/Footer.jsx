import useNavigationHandler from '../../hooks/useNavigationHandler';
import navLinks from '../../constants/navLinks';
import './Footer.scss';

const Footer = () => {
  const handleNavigation = useNavigationHandler();

  const onNavClick = (event, link) => {
    event.preventDefault();
    handleNavigation(link);
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <h2 className="footer__brand">Asis Motors</h2>
        <div className="footer__links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path || `/#${link.sectionId}`}
              onClick={(event) => onNavClick(event, link)}
            >
              {link.label}
            </a>
          ))}
          <span className="footer__location">110 Samaritan Drive Cumming, GA 30040</span>
        </div>
        <a className="footer__phone" href="tel:678-456-8732">
          (678) 456-8732
        </a>
        <small>© 2025 Asis Motors. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;

