export interface Activity {
  id: string;
  name: string;
  description: string;
  type: string;
  duration: number;
  priceRange: string;
  locations: string[];
  moodTypes: string[];
  timeSlots: string[];
  images: string[];
  rating: number;
  reviews: number;
}

export interface ActivityType {
  id: string;
  name: string;
  activities: Activity[];
} 