import { User } from './user';

export interface Notification {
  id: string;
  type: 'friendRequest' | 'message' | 'schedule' | 'system';
  title: string;
  message: string;
  sender?: User;
  data?: any;
  timestamp: Date;
  isRead: boolean;
}

export interface NotificationType {
  id: string;
  name: string;
  notifications: Notification[];
} 