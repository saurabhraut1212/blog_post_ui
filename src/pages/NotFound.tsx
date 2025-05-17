import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">😕 Oops!</h1>
      <p className="text-2xl text-gray-700 mb-6">We can't find the page you're looking for.</p>

      <div className="flex gap-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/')}
        >
          🏠 Go to Home
        </button>
        <button
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate('/login')}
        >
          🔐 Login
        </button>
      </div>
    </div>
  );
};

export default NotFound;
