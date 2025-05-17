import React, { type ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AllBlogs from '../pages/AllBlogs';
import CreateBlog from '../pages/CreateBlog';
import NotFound from '../pages/NotFound';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/blogs"
        element={
          <PrivateRoute>
            <AllBlogs />
          </PrivateRoute>
        }
      />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreateBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-blog/:id"
        element={
          <PrivateRoute>
            <CreateBlog />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
