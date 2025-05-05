export interface TimeSlot {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  activities: string[];
  locations: string[];
  moodTypes: string[];
}

export interface TimeSlotType {
  id: string;
  name: string;
  timeSlots: TimeSlot[];
} 