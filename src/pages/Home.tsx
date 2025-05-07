import titleLogo from '../assets/title.svg';
import Navigation from '../components/Navigation';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <header className="header">
          <img 
            src={titleLogo} 
            alt="Camping Log" 
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </header>
        <Navigation />
      </div>
    </div>
  );
};

export default Home; 