import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Users {
  [email: string]: User;
}

const USERS_STORAGE_KEY = '@PlanUs:users';

export class AuthService {
  private async getUsers(): Promise<Users> {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      return usersJson ? JSON.parse(usersJson) : {};
    } catch (error) {
      console.error('Error getting users:', error);
      return {};
    }
  }

  private async saveUsers(users: Users): Promise<void> {
    try {
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
      throw error;
    }
  }

  async register(email: string, password: string, name: string) {
    try {
      // Get existing users
      const users = await this.getUsers();

      // Check if email already exists
      if (users[email]) {
        throw new Error('Email already exists');
      }

      // Create new user
      const user: User = {
        id: Date.now().toString(),
        email,
        password, // Note: In a real app, this should be hashed
        name,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Store user
      users[email] = user;
      await this.saveUsers(users);

      // Return user data without password
      return { id: user.id, name: user.name, email: user.email };
    } catch (error) {
      console.error('Error in register:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      // Get users
      const users = await this.getUsers();
      const user = users[email];

      if (!user) {
        throw new Error('User not found');
      }

      // Check password (in a real app, this should compare hashed passwords)
      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      // Return user data without password
      return { id: user.id, name: user.name, email: user.email };
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    try {
      // Get users
      const users = await this.getUsers();
      const user = Object.values(users).find(u => u.id === userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Check old password
      if (user.password !== oldPassword) {
        throw new Error('Invalid old password');
      }

      // Update password
      user.password = newPassword;
      user.updatedAt = new Date();

      // Save updated users
      users[user.email] = user;
      await this.saveUsers(users);

      return { id: user.id, name: user.name, email: user.email };
    } catch (error) {
      console.error('Error in changePassword:', error);
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      // Get users
      const users = await this.getUsers();
      const user = users[email];

      if (!user) {
        throw new Error('User not found');
      }

      // In a real app, this would send a password reset email
      // For now, we'll just simulate success
      return true;
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      throw error;
    }
  }
} 