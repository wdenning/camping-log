import bracketUpper from '../assets/bracket-upper.svg';
import bracketLower from '../assets/bracket-lower.svg';
import NavLink from './NavLink';
import '../styles/Home.css';

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className = '' }: NavigationProps) => {
  return (
    <nav className={`navigation ${className}`}>
      <img src={bracketUpper} alt="Upper Bracket" className="bracket upper" />
      <NavLink to="/about" label="About" />
      <NavLink to="/posts" label="Posts" />
      <NavLink to="/map" label="Map" />
      <NavLink to="/gear" label="Gear List" />
      <img src={bracketLower} alt="Lower Bracket" className="bracket lower" />
    </nav>
  );
};

export default Navigation;