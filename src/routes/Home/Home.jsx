import Footer from '../../components/Footer/Footer';
import Faq from '../../components/Faq/Faq';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import SellInfo from '../../components/SellInfo/SellInfo';
import Steps from '../../components/Steps/Steps';
import TrustBar from '../../components/TrustBar/TrustBar';
import WhyChoose from '../../components/WhyChoose/WhyChoose';
import './Home.scss';

const Home = () => (
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

export default Home;

