export interface User {
  id: string;
  email: string;
}

export interface DecodedToken {
  userId: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface IFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IFormInput {
  email: string;
  password: string;
}
