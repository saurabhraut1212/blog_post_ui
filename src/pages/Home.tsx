import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">👋 Welcome to Blogify!</h1>
      <p className="text-lg text-gray-800 mb-4">
        📝 A place to read, write, and share amazing blogs.
      </p>
      <p className="text-md text-gray-600 mb-6">
        💡 Share your ideas with the world and explore what others are saying.
      </p>

      {!user && (
        <p className="text-md font-medium text-red-600">
          🚫 To view and create blogs, please register and login first!
        </p>
      )}
    </div>
  );
};

export default Home;
