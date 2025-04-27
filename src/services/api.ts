import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Thay đổi localhost thành IP máy tính của bạn
const API_URL = 'http://192.168.1.5:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // timeout sau 10s
});

// Add token to requests if it exists
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error('Error accessing token:', error);
    return config;
  }
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      try {
        await AsyncStorage.removeItem('auth_token');
      } catch (e) {
        console.error('Error removing token:', e);
      }
    }
    return Promise.reject(error);
  }
);

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      const { token } = response.data;
      if (token) {
        await AsyncStorage.setItem('auth_token', token);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
      }
      throw error;
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      console.log('Sending registration request:', {
        ...data,
        password: '[HIDDEN]'
      });
      
      const response = await api.post<AuthResponse>('/auth/register', data);
      console.log('Registration response:', {
        status: response.status,
        data: {
          ...response.data,
          token: response.data.token ? '[PRESENT]' : '[MISSING]'
        }
      });

      const { token } = response.data;
      if (token) {
        await AsyncStorage.setItem('auth_token', token);
      } else {
        console.warn('No token received in registration response');
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', {
        isAxiosError: axios.isAxiosError(error),
        status: axios.isAxiosError(error) ? error.response?.status : undefined,
        data: axios.isAxiosError(error) ? error.response?.data : undefined,
        message: error instanceof Error ? error.message : String(error)
      });

      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 
          `Đăng ký thất bại: ${error.response?.status === 0 ? 'Không thể kết nối đến server' : error.message}`
        );
      }
      throw error;
    }
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Không thể gửi email khôi phục mật khẩu');
      }
      throw error;
    }
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await api.post('/auth/reset-password', { token, newPassword });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Không thể đặt lại mật khẩu');
      }
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Error during logout:', error);
      throw new Error('Không thể đăng xuất');
    }
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },
}; 