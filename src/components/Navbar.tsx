import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-white">
        Blogify
      </Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link
              to="/blogs"
              className={`hover:underline ${isActive('/blogs') && 'font-semibold underline'}`}
            >
              All Blogs
            </Link>
            <Link
              to="/create"
              className={`hover:underline ${isActive('/create') && 'font-semibold underline'}`}
            >
              Create Blog
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`hover:underline ${isActive('/login') && 'font-semibold underline'}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`hover:underline ${isActive('/register') && 'font-semibold underline'}`}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
