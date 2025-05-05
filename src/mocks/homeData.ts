import { UpcomingEvent, PlaceRecommendation, ActivityStat, RecentPlan } from '../types/home';

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Buổi hẹn với Mai',
    date: '2024-03-15',
    time: '19:00',
    location: 'Nhà hàng ABC',
    type: 'date',
  },
  {
    id: '2',
    title: 'Nhắc nhở đặt hoa',
    date: '2024-03-15',
    time: '17:00',
    location: 'Cửa hàng hoa XYZ',
    type: 'reminder',
  },
];

export const placeRecommendations: PlaceRecommendation[] = [
  {
    id: '1',
    name: 'Nhà hàng ABC',
    image: 'https://example.com/restaurant1.jpg',
    rating: 4.5,
    priceLevel: 2,
    distance: '1.2km',
    tags: ['Ẩm thực', 'Lãng mạn', 'Nhà hàng'],
  },
  {
    id: '2',
    name: 'Quán cà phê XYZ',
    image: 'https://example.com/cafe1.jpg',
    rating: 4.2,
    priceLevel: 1,
    distance: '0.8km',
    tags: ['Cà phê', 'Thư giãn', 'View đẹp'],
  },
];

export const activityStats: ActivityStat[] = [
  {
    category: 'Lãng mạn',
    count: 8,
    percentage: 40,
  },
  {
    category: 'Ẩm thực',
    count: 6,
    percentage: 30,
  },
  {
    category: 'Giải trí',
    count: 4,
    percentage: 20,
  },
  {
    category: 'Thể thao',
    count: 2,
    percentage: 10,
  },
];

export const recentPlans: RecentPlan[] = [
  {
    id: '1',
    title: 'Tour ẩm thực Hà Nội',
    date: '2024-03-10',
    description: 'Khám phá ẩm thực đường phố Hà Nội',
    sharedWith: ['Mai', 'Lan'],
    moodType: 'food',
  },
  {
    id: '2',
    title: 'Buổi tối lãng mạn',
    date: '2024-03-05',
    description: 'Dinner và đi dạo quanh hồ',
    sharedWith: ['Mai'],
    moodType: 'romantic',
  },
]; 