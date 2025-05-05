import { User } from './user';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  userId: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  forgotPassword: (userId: string) => Promise<void>;
} 