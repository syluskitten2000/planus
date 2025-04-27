export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Welcome: undefined;
  ForgotPassword: undefined;
  Mood: undefined;
  Preferences: { moodType: string };
  Schedule: {
    moodType: string;
    area: string;
    budget: string;
    timeSlot: string;
  };
  Confirmation: {
    schedule: Array<{
      time: string;
      activity: string;
      location: string;
    }>;
  };
  History: undefined;
}; 