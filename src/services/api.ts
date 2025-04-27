import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, AUTH_STORAGE_KEY } from '../config/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_CONFIG.TIMEOUT,
});

// Add token to requests if it exists
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
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
    if (!error.response) {
      // Network error or CORS issue
      if (__DEV__) {
        console.error('API Error:', error);
        throw new Error(
          'Không thể kết nối đến máy chủ. Vui lòng kiểm tra:\n' +
          '1. Server đang chạy tại http://localhost:5000\n' +
          '2. CORS được cấu hình đúng trên server\n' +
          '3. Kết nối mạng của bạn'
        );
      } else {
        throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
      }
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        throw new Error(data?.message || 'Dữ liệu không hợp lệ');
      case 401:
        // Remove token on auth error
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
        throw new Error(data?.message || 'Phiên đăng nhập đã hết hạn');
      case 403:
        throw new Error(data?.message || 'Bạn không có quyền thực hiện thao tác này');
      case 404:
        throw new Error(data?.message || 'Không tìm thấy tài nguyên');
      case 409:
        throw new Error(data?.message || 'Dữ liệu đã tồn tại');
      case 500:
        throw new Error('Lỗi máy chủ. Vui lòng thử lại sau.');
      default:
        if (__DEV__) {
          console.error('API Error:', { status, data });
        }
        throw new Error(data?.message || 'Đã có lỗi xảy ra');
    }
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
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw new Error('Không thể kết nối đến máy chủ');
        }
        if (__DEV__) {
          console.error('Login error:', error.response.data);
        }
        throw new Error(error.response.data?.message || 'Đăng nhập thất bại');
      }
      throw error;
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw new Error('Không thể kết nối đến máy chủ');
        }
        if (__DEV__) {
          console.error('Registration error:', error.response.data);
        }
        if (error.response.status === 409) {
          throw new Error('Email đã được sử dụng');
        }
        throw new Error(error.response.data?.message || 'Đăng ký thất bại');
      }
      throw error;
    }
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw new Error('Không thể kết nối đến máy chủ');
        }
        if (__DEV__) {
          console.error('Forgot password error:', error.response.data);
        }
        throw new Error(error.response.data?.message || 'Không thể gửi email khôi phục mật khẩu');
      }
      throw error;
    }
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await api.post('/auth/reset-password', { token, newPassword });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          throw new Error('Không thể kết nối đến máy chủ');
        }
        if (__DEV__) {
          console.error('Reset password error:', error.response.data);
        }
        throw new Error(error.response.data?.message || 'Không thể đặt lại mật khẩu');
      }
      throw error;
    }
  },
}; 