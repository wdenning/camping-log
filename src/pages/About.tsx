import '../styles/Page.css';
import NavLink from '../components/NavLink';
import { useEffect, useState } from 'react';
import Post from '../components/Post';

const About = () => {

  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/camping-log/posts/about.md`);
        if (!response.ok) throw new Error('Post not found');
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading post:', error);
        setContent('# Post Not Found\n\nThe requested post could not be found.');
      }
    };

    fetchPost();
  });

  return (
    <div className="page-container">
      <div className="back-link-container">
        <NavLink to="/" label="Back" />
      </div>
      <div className="page-content">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/RzACrNBYKFE?start=1198&autoplay=1" title="YouTube video player" allow="autoplay; encrypted-media"></iframe>
        <Post content={content} />
      </div>
    </div>
  );
};

export default About; 