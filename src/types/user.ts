export interface User {
  id: string;
  name: string;
  userId: string;
  avatar: string;
  bio?: string;
  location?: string;
  interests?: string[];
  isFriend?: boolean;
  friendRequestStatus?: 'pending' | 'accepted' | 'rejected';
  receivedFriendRequests?: string[];
  sentFriendRequests?: string[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: string;
  description: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: string;
} 