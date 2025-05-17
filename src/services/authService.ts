import { getBaseUrl } from '../libs/baseUrl';
import type { RegisterPayload, LoginPayload } from '../types/auth';

export const registerUser = async (
  data: RegisterPayload,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${getBaseUrl()}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return { success: true, message: 'Registration successful' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'An unknown error occurred' };
  }
};

export const loginUser = async (
  data: LoginPayload,
): Promise<{ success: boolean; message: string; token?: string }> => {
  try {
    const response = await fetch(`${getBaseUrl()}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const result = await response.json();

    return { success: true, message: 'Login successful', token: result.token };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: 'An unknown error occurred' };
  }
};
