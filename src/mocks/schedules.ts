import { ScheduleItem } from '../types/schedule';

export const schedules: ScheduleItem[] = [
  {
    id: '1',
    time: '09:00',
    activity: 'Ăn sáng',
    location: 'Cafe ABC',
    moodType: 'vui vẻ',
    area: 'Quận 1',
    budget: '100k-200k',
    timeSlot: 'sáng',
    createdAt: '2024-03-15T08:00:00Z',
  },
  {
    id: '2',
    time: '14:00',
    activity: 'Xem phim',
    location: 'CGV Vincom',
    moodType: 'lãng mạn',
    area: 'Quận 1',
    budget: '200k-500k',
    timeSlot: 'chiều',
    createdAt: '2024-03-14T13:00:00Z',
  },
  {
    id: '3',
    time: '19:00',
    activity: 'Ăn tối',
    location: 'Nhà hàng XYZ',
    moodType: 'thư giãn',
    area: 'Quận 2',
    budget: '500k-1tr',
    timeSlot: 'tối',
    createdAt: '2024-03-13T18:00:00Z',
  },
]; 