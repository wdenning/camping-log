import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkPdfExists } from '../utils/checkPdfExists';
import NavLink from '../components/NavLink';
import Post from '../components/Post';
import '../styles/Page.css';


const PostPage = () => {
  const { postId } = useParams();
  const [content, setContent] = useState<string>('');
  const [pdfExists, setPdfExists] = useState<boolean>(false);

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

    // Check if PDF exists
    if (postId) {
      checkPdfExists(`${postId}.pdf`).then(setPdfExists);
    } else {
      setPdfExists(false);
    }
  }, [postId]);

  return (
    <div className="page-container">
      <div className="page-content">
        <Post content={content} />
        {pdfExists && postId && (
          <div style={{ margin: '1em 0' }}>
            <a
              href={`/camping-log/files/${postId}.pdf`}
              download
              className="download-pdf-btn"
              style={{
                display: 'inline-block',
                padding: '0.5em 1em',
                background: '#333',
                color: '#fff',
                borderRadius: '4px',
                textDecoration: 'none',
                marginTop: '1em',
              }}
            >
              Download PDF version
            </a>
          </div>
        )}
      </div>
      <div className="back-link-container">
        <NavLink to="/posts" label="Back" />
      </div>
    </div>
  );
};

export default PostPage; 