import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from '../config/storage';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (token: string, userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved user data when app starts
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const [token, userData] = await Promise.all([
        AsyncStorage.getItem(AUTH_STORAGE_KEY),
        AsyncStorage.getItem(USER_STORAGE_KEY),
      ]);

      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(token: string, userData: User) {
    try {
      await Promise.all([
        AsyncStorage.setItem(AUTH_STORAGE_KEY, token),
        AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData)),
      ]);
      setUser(userData);
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw new Error('Không thể lưu thông tin đăng nhập');
    }
  }

  async function signOut() {
    try {
      await Promise.all([
        AsyncStorage.removeItem(AUTH_STORAGE_KEY),
        AsyncStorage.removeItem(USER_STORAGE_KEY),
      ]);
      setUser(null);
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw new Error('Không thể đăng xuất');
    }
  }

  async function updateUser(userData: User) {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error updating user data:', error);
      throw new Error('Không thể cập nhật thông tin người dùng');
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 