export interface Mood {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface MoodType {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  activities: string[];
  locations: string[];
  budget: string[];
  timeSlots: string[];
} 