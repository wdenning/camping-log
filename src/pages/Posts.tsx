import '../styles/Page.css';
import NavLink from '../components/NavLink';
import { Link } from 'react-router-dom';

const Posts = () => {
  const posts = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Camping Posts</h1>
        <div className="posts-grid">
          {posts.map((number) => (
            <Link 
              key={number} 
              to={`/posts/${number.toString().padStart(2, '0')}`}
              className={`post-square ${number > 5 ? 'disabled' : ''}`}
            >
              <span className="post-number">{number.toString().padStart(2, '0')}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="back-link-container">
        <NavLink to="/" label="Back" />
      </div>
    </div>
  );
};

export default Posts; 