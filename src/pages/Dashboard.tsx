import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  console.log(user, 'user is here');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-4">
      <h1 className="text-4xl font-bold mb-4 text-indigo-800">🚀 Welcome to Your Dashboard!</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl text-center">
        <p className="text-lg text-gray-700 mb-4">
          👋 Hello, <span className="font-semibold text-indigo-700">{user?.email}</span>
        </p>

        <p className="text-md text-gray-600 mb-3">
          📚 You can now explore all blogs, create your own, and manage your posts.
        </p>
        <p className="text-md text-gray-600 mb-3">
          💡 Be creative, be expressive, and let your ideas flow!
        </p>
        <p className="text-md text-gray-600">🛠 Use the navigation bar to get started.</p>
      </div>
    </div>
  );
};

export default Dashboard;
