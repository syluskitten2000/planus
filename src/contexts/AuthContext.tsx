import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';
import { users } from '../mocks/users';

interface AuthContextType {
  user: User | null;
  signIn: (userid: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'status'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const signIn = async (userid: string, password: string) => {
    try {
      const foundUser = users.find(
        u => u.userid === userid && u.password === password
      );

      if (!foundUser) {
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
      }

      const userToStore = {
        ...foundUser,
        lastLogin: new Date().toISOString(),
      };

      await AsyncStorage.setItem('user', JSON.stringify(userToStore));
      setUser(userToStore);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'status'>) => {
    try {
      // Check if userid already exists
      const existingUser = users.find(u => u.userid === userData.userid);
      if (existingUser) {
        throw new Error('Tên đăng nhập đã tồn tại');
      }

      // Create new user
      const newUser: User = {
        ...userData,
        id: (users.length + 1).toString(),
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: 'active',
      };

      // In a real app, you would save this to your backend
      // For now, we'll just add it to our mock data
      users.push(newUser);

      // Save to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, register }}>
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