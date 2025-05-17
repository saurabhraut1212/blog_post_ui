import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';
import type { IFormInput } from '../types/auth';
import { loginUser } from '../services/authService';
import toast from 'react-hot-toast';

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  })
  .required();

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: IFormInput) => {
    const result = await loginUser(data);
    console.log(result, 'login result');
    if (result.success && result.token) {
      toast.success('Login successfully');
      login(result?.token);
      navigate('/dashboard');
    } else {
      toast.error(`Registration failed: ${result.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Input
          label="Email"
          type="email"
          placeholder="your.email@example.com"
          error={errors.email}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="********"
          error={errors.password}
          {...register('password')}
        />
        <Button
          label={isSubmitting ? 'Logging in...' : 'Login'}
          type="submit"
          className="w-full mt-4"
          disabled={isSubmitting}
        />

        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
