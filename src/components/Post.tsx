import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/Post.css';

interface PostProps {
  content: string;
}

const Post = ({ content }: PostProps) => {
  return (
    <div className="post-content">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => (
            <div className="post-image-container">
              <img {...props} alt={props.alt || ''} className="post-image" />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Post;