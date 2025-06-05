import '../styles/Page.css';
import NavLink from '../components/NavLink';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Camping Posts</h1>
        <div className="posts-grid">
          {posts.map((number) => (
            <Link 
              key={number} 
              to={`/posts/${number.toString().padStart(2, '0')}`}
              className={`post-square ${number > 2 && number <= 33 ? 'disabled' : ''}`}
            >
              <span className="post-number">{number.toString().padStart(2, '0')}</span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: '2em', textAlign: 'center' }}>
          <a
            href={"/camping-log/files/allPosts.pdf"}
            download
            className="download-pdf-btn"
            style={{
              display: 'inline-block',
              padding: '0.75em 1.5em',
              background: '#333',
              color: '#fff',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.1em',
              marginTop: '1em',
            }}
          >
            Download all posts as PDF
          </a>
        </div>
      </div>
      <div className="back-link-container">
        <NavLink to="/" label="Back" />
      </div>
    </div>
  );
};

export default Posts;
