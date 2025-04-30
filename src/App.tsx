import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import Map from './pages/Map';
import Gear from './pages/Gear';
import './styles/Page.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/map" element={<Map />} />
        <Route path="/gear" element={<Gear />} />
      </Routes>
    </Router>
  );
}

export default App;
