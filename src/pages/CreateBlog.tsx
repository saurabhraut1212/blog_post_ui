import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { createBlog, getBlogById, updateBlog } from '../services/blogService';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const CreateOrEditBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setTitle('');
        setContent('');
        setAuthorName('');
        setLoading(false);
        return;
      }

      try {
        const blog = await getBlogById(id);
        console.log(blog, 'blog with id');
        setTitle(blog.title);
        setContent(blog.content);
        setAuthorName(blog.authorName);
      } catch {
        toast.error('Failed to load blog data');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !authorName.trim()) {
      toast.error('All fields are required');
      return;
    }

    setSubmitting(true);
    try {
      if (!user) throw new Error('Not authenticated');
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found');

      if (isEditMode) {
        await updateBlog(id!, { title, content, authorName }, token);
        toast.success('Blog updated successfully');
      } else {
        await createBlog({ title, content, authorName }, token);
        toast.success('Blog created successfully');
      }
      navigate('/blogs');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Submission failed';
      if (message === 'Not authenticated' || message === 'No auth token found') {
        toast.error('Session expired. Please login again.');
        logout();
        navigate('/login');
      } else {
        toast.error(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && isEditMode) return <p>Loading blog data...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 mt-10">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isEditMode ? '✏️ Edit Blog' : '📝 Create New Blog'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            disabled={submitting}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            disabled={submitting}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors ${
              submitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {submitting ? 'Submitting...' : isEditMode ? 'Update Blog' : 'Create Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrEditBlog;
