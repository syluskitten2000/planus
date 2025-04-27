export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Welcome: undefined;
  Preferences: undefined;
  Schedule: {
    selectedDistrict: string;
    preferences: {
      cafes: boolean;
      restaurants: boolean;
      entertainment: boolean;
      shopping: boolean;
    };
  };
  History: undefined;
}; 