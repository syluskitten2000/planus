export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'date' | 'reminder';
}

export interface PlaceRecommendation {
  id: string;
  name: string;
  image: string;
  rating: number;
  priceLevel: number;
  distance: string;
  tags: string[];
}

export interface ActivityStat {
  category: string;
  count: number;
  percentage: number;
}

export interface RecentPlan {
  id: string;
  title: string;
  date: string;
  description: string;
  sharedWith: string[];
  moodType: string;
} 