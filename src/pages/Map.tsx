import '../styles/Page.css';
import NavLink from '../components/NavLink';

const Map = () => {
  return (
    <div className="page-container">
      <div className="back-link-container">
        <NavLink to="/" label="Back" />
      </div>
      <div className="page-content">
        <h1>Camping Locations</h1>
        <p>Coming soon: Interactive map of camping spots I've visited.</p>
      </div>
    </div>
  );
};

export default Map; 