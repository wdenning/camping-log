import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavLink from '../components/NavLink';
import Post from '../components/Post';
import '../styles/Page.css';

const PostPage = () => {
  const { postId } = useParams();
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/camping-log/posts/${postId}.md`);
        if (!response.ok) throw new Error('Post not found');
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading post:', error);
        setContent('# Post Not Found\n\nThe requested post could not be found.');
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="page-container">
      <div className="page-content">
        <Post content={content} />
      </div>
      <div className="back-link-container">
        <NavLink to="/posts" label="Back" />
      </div>
    </div>
  );
};

export default PostPage; 