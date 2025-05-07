import '../styles/Page.css';
import NavLink from '../components/NavLink';

const Gear = () => {
  return (
    <div className="page-container">
      <div className="back-link-container">
        <NavLink to="/" label="Back" />
      </div>
      <div className="page-content">
        <h1>Gear List</h1>
        <p>Coming soon: My essential camping equipment and recommendations.</p>
      </div>
    </div>
  );
};

export default Gear; 