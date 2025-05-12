import '../styles/Page.css';
import '../styles/Posts.css';
import NavLink from '../components/NavLink';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Posts = () => {
  const [posts, setPosts] = useState<number[]>([]);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    console.log('Fetching posts.json from:', `${baseUrl}posts/posts.json`);
    fetch(`${baseUrl}posts/posts.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const postNumbers = data
          .filter((file: string) => file.endsWith('.md'))
          .map((file: string) => parseInt(file.replace('.md', ''), 10))
          .filter((number: number) => !isNaN(number))
          .sort((a: number, b: number) => a - b);
        setPosts(postNumbers);
      })
      .catch((error) => {
        console.error('Error fetching posts.json:', error);
      });
  }, []);

  const getReadPosts = () => {
    const readPosts = Cookies.get('readPosts');
    return readPosts ? JSON.parse(readPosts) : [];
  };

  const resetReadStatus = () => {
    Cookies.remove('readPosts');
    window.location.reload(); // Reload the page to reflect changes
  };

  const allPosts = Array.from({ length: 33 }, (_, i) => i + 1);
  const readPosts = getReadPosts();
  const displayedPosts = allPosts.map((number) => ({
    number,
    disabled: !posts.includes(number),
    read: readPosts.includes(number),
  }));

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Camping Posts</h1>
        <div className="posts-grid">
          {displayedPosts.map(({ number, disabled, read }) => (
            <Link 
              key={number} 
              to={`/posts/${number.toString().padStart(2, '0')}`}
              className={`post-square ${disabled ? 'disabled' : ''} ${read ? 'read' : ''}`}
            >
              <span className="post-number">{number.toString().padStart(2, '0')}</span>
              {read && <span className="read-tag">Read</span>}
            </Link>
          ))}
        </div>
        <button className="reset-button" onClick={resetReadStatus}>Reset Read Status</button>
      </div>
      <div className="back-link-container">
        <NavLink to="/" label="Back" />
      </div>
    </div>
  );
};

export default Posts;