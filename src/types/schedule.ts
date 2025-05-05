import { LocationDetail } from './location';

export interface ScheduleItem {
  id: string;
  time: string;
  activity: string;
  location: LocationDetail;
  moodType: string;
  area: string;
  budget: string;
  timeSlot: string;
  type: string;
  createdAt?: string;
}

export interface ScheduleType {
  id: string;
  name: string;
  schedule: ScheduleItem[];
} 