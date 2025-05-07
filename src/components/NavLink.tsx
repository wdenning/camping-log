import { Link } from 'react-router-dom';
import fireUnlit from '../assets/fire-unlit.svg';
import fireFrame1 from '../assets/fire-frame-1.svg';
import fireFrame2 from '../assets/fire-frame-2.svg';
import '../styles/Home.css';

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink = ({ to, label }: NavLinkProps) => {
  return (
    <Link to={to} className="nav-link">
      <div className="nav-card">
        <div className="nav-title">
          <img src={fireUnlit} alt="Fire" className="fire-icon unlit" />
          <img src={fireFrame1} alt="Fire" className="fire-icon frame1" />
          <img src={fireFrame2} alt="Fire" className="fire-icon frame2" />
          <h2>{label}</h2>
        </div>
      </div>
    </Link>
  );
};

export default NavLink; 