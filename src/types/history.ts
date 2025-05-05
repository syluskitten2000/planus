import { ScheduleItem } from './schedule';

export interface HistoryItem {
  id: string;
  date: string;
  moodType: string;
  schedule: ScheduleItem[];
  rating: number;
  review?: string;
}

export interface HistoryType {
  id: string;
  name: string;
  history: HistoryItem[];
} 