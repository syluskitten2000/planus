import { User } from './user';

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'location';
  metadata?: any;
}

export interface ChatType {
  id: string;
  name: string;
  chats: Chat[];
} 