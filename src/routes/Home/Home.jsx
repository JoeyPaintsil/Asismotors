import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Faq from '../../components/Faq/Faq';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import SellInfo from '../../components/SellInfo/SellInfo';
import Steps from '../../components/Steps/Steps';
import TrustBar from '../../components/TrustBar/TrustBar';
import WhyChoose from '../../components/WhyChoose/WhyChoose';
import './Home.scss';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const targetId = location.state?.scrollTo;

    if (targetId) {
      const timeout = setTimeout(() => {
        const section = document.getElementById(targetId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [location, navigate]);

  return (
    <div className="home-page">
      <Header />
      <Hero />
      <TrustBar />
      <Steps />
      <SellInfo />
      <WhyChoose />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;

