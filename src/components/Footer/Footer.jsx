import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <div className="footer__links">
        <a href="#offer">Cash For Cars</a>
        <a href="#about">About</a>
        <a href="#blog">Blog</a>
        <a href="#contact">Contact Us</a>
        <a href="#privacy">Privacy</a>
        <a href="#resources">Resources</a>
        <span className="footer__location">641 Clearlake Rd Unit 53. | Cocoa, FL 32922</span>
      </div>
      <a className="footer__phone" href="tel:8883834181">
        (888) 383-4181
      </a>
      <small>© 2025 Aziz Motors. All rights reserved.</small>
    </div>
  </footer>
);

export default Footer;

