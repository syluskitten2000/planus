import { User } from './user';
import { HistoryItem } from './history';
import { Chat } from './chat';

export interface Profile {
  user: User;
  history: HistoryItem[];
  friends: User[];
  chats: Chat[];
  settings: {
    notifications: boolean;
    location: boolean;
    darkMode: boolean;
    language: string;
  };
}

export interface ProfileType {
  id: string;
  name: string;
  profiles: Profile[];
} 