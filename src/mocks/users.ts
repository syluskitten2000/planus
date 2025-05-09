import { User, Message, Report } from '../types/user';

export const users: User[] = [
  {
    id: '1',
    userid: 'nguyenvana',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    password: 'password123',
    avatar: 'https://example.com/avatar1.jpg',
    createdAt: '2024-01-15',
    lastLogin: '2024-03-14',
    status: 'active',
    isFriend: true,
    friendRequestStatus: 'accepted',
    bio: 'Yêu thích du lịch và ẩm thực',
    location: 'Hà Nội',
    interests: ['Du lịch', 'Ẩm thực', 'Nhiếp ảnh'],
    receivedFriendRequests: [],
    sentFriendRequests: ['2'],
  },
  {
    id: '2',
    userid: 'tranthib',
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    password: 'password123',
    avatar: 'https://example.com/avatar2.jpg',
    createdAt: '2024-02-01',
    lastLogin: '2024-03-13',
    status: 'active',
    isFriend: false,
    friendRequestStatus: 'pending',
    bio: 'Đam mê nghệ thuật và âm nhạc',
    location: 'TP.HCM',
    interests: ['Nghệ thuật', 'Âm nhạc', 'Hội họa'],
    receivedFriendRequests: ['1'],
    sentFriendRequests: [],
  },
  {
    id: '3',
    userid: 'levanc',
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    password: 'password123',
    avatar: 'https://example.com/avatar3.jpg',
    createdAt: '2024-02-15',
    lastLogin: '2024-03-10',
    status: 'inactive',
    isFriend: false,
    bio: 'Thích đọc sách và viết lách',
    location: 'Đà Nẵng',
    interests: ['Sách', 'Viết lách', 'Ngôn ngữ'],
    receivedFriendRequests: [],
    sentFriendRequests: [],
  },
  {
    id: '4',
    userid: 'phamthid',
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    password: 'password123',
    avatar: 'https://example.com/avatar4.jpg',
    createdAt: '2024-03-01',
    lastLogin: '2024-03-14',
    status: 'active',
    isFriend: false,
    bio: 'Yêu thích thể thao và sức khỏe',
    location: 'Hải Phòng',
    interests: ['Thể thao', 'Sức khỏe', 'Yoga'],
    receivedFriendRequests: [],
    sentFriendRequests: [],
  },
];

export const messages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Xin chào! Bạn có muốn đi xem phim không?',
    timestamp: '2024-03-14T10:00:00Z',
    isRead: true,
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    content: 'Chào bạn! Có chứ, bạn muốn xem phim gì?',
    timestamp: '2024-03-14T10:05:00Z',
    isRead: true,
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '2',
    content: 'Mình thích phim hành động, bạn thì sao?',
    timestamp: '2024-03-14T10:10:00Z',
    isRead: false,
  },
];

export const reports: Report[] = [
  {
    id: '1',
    reporterId: '1',
    reportedUserId: '3',
    reason: 'Spam',
    description: 'Người dùng này liên tục gửi tin nhắn quảng cáo',
    status: 'pending',
    createdAt: '2024-03-13T15:00:00Z',
  },
  {
    id: '2',
    reporterId: '2',
    reportedUserId: '4',
    reason: 'Nội dung không phù hợp',
    description: 'Người dùng này đăng nội dung không phù hợp',
    status: 'reviewed',
    createdAt: '2024-03-12T10:00:00Z',
  },
]; 