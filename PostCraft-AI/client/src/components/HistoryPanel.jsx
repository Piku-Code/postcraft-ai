import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { PostCard } from './PostCard';
import axios from 'axios';
import { Toast } from './ui/Toast';

export const HistoryPanel = forwardRef((props, ref) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  useEffect(() => {
    fetchPosts();
  }, []);

  useImperativeHandle(ref, () => ({
    refresh: fetchPosts,
  }));

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
      showToast('Post deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting post:', error);
      showToast('Failed to delete post', 'error');
    }
  };

  const handleCopy = (message) => {
    showToast(message || 'Post copied to clipboard!', 'success');
  };

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2 font-space">History</h2>
        <p className="text-sm text-muted-foreground">Your previously generated posts.</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No posts yet. Generate your first post to see it here!
        </div>
      ) : (
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              isHistory={true}
              onCopy={handleCopy}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
});

HistoryPanel.displayName = 'HistoryPanel';

