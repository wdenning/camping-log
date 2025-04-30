import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>My Camping Log</h1>
        <p className="subtitle">Track your adventures in the great outdoors</p>
      </header>
      
      <nav className="navigation">
        <Link to="/about" className="nav-link">
          <div className="nav-card">
            <h2>About</h2>
            <p>Learn more about this camping log</p>
          </div>
        </Link>
        <Link to="/posts" className="nav-link">
          <div className="nav-card">
            <h2>Posts</h2>
            <p>Read about my camping experiences</p>
          </div>
        </Link>
        <Link to="/map" className="nav-link">
          <div className="nav-card">
            <h2>Map</h2>
            <p>Explore camping locations</p>
          </div>
        </Link>
        <Link to="/gear" className="nav-link">
          <div className="nav-card">
            <h2>Gear List</h2>
            <p>Check out my camping equipment</p>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Home; 