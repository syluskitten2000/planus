import mongoose from 'mongoose';
import { AuthService } from '../services/auth.service';

// Kết nối tới MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/planus'; // Thay đổi nếu cần

const authService = new AuthService();

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Đăng ký user mới
    const user = await authService.register('user@example.com', 'yourpassword');
    console.log('User registered:', user);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    await mongoose.disconnect();
  }
}

main(); 