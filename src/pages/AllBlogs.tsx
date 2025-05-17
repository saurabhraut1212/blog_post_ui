import React, { useEffect, useState } from 'react';
import { getAllBlogs, deleteBlog } from '../services/blogService';
import type { Blog } from '../services/blogService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AllBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        const blogList = response; // Adjust based on your API structure
        setBlogs(blogList);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error fetching blogs';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found');

      await deleteBlog(id, token);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      toast.success('Blog deleted successfully');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete blog';
      toast.error(message);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-blog/${id}`);
  };

  if (loading) return <p>Loading blogs...</p>;
  if (blogs.length === 0) return <p>No blogs found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-15">
      <h2 className="text-2xl font-bold mb-6">All Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map(({ _id, title, content, authorName, createdAt, author }) => {
          const isOwner = user?.id === author;

          return (
            <div
              key={_id}
              className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-700 text-sm mb-4">
                {content.length > 200 ? content.slice(0, 200) + '...' : content}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                By <span className="font-medium">{authorName || 'Unknown'}</span> on{' '}
                {new Date(createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(_id)}
                  disabled={!isOwner}
                  className={`px-3 py-1 text-sm rounded ${
                    isOwner
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  disabled={!isOwner}
                  className={`px-3 py-1 text-sm rounded ${
                    isOwner
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllBlogs;
