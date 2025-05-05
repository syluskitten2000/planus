import { User } from './user';
import { ScheduleItem } from './schedule';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  Mood: undefined;
  Preferences: { moodType: string };
  Schedule: {
    moodType: string;
    area: string;
    budget: string;
    timeSlot: string;
  };
  Confirmation: {
    schedule: ScheduleItem[];
  };
  History: undefined;
  Profile: { userId?: string };
  Users: undefined;
  Chat: { userId: string };
}; 