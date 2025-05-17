import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import type { IFormInputs } from '../types/auth';
import { registerUser } from '../services/authService';
import toast from 'react-hot-toast';

const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  .required();

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: IFormInputs) => {
    const result = await registerUser(data);

    if (result.success) {
      toast.success('Registered successfully! Please login.');
      navigate('/login');
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
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

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

        <Input
          label="Confirm Password"
          type="password"
          placeholder="********"
          error={errors.confirmPassword}
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          label={isSubmitting ? 'Registering...' : 'Register'}
          className="w-full mt-4"
          disabled={isSubmitting}
        />

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
