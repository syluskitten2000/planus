import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/planus'; // Thay đổi nếu cần

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}; 