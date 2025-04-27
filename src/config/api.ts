export const API_CONFIG = {
  // Change this to your API URL
  BASE_URL: __DEV__ 
    ? 'http://localhost:5000/api'  // Development
    : 'https://api.planus.com/api', // Production
  TIMEOUT: 10000, // 10 seconds
};

export const AUTH_STORAGE_KEY = 'auth_token';
export const USER_STORAGE_KEY = 'user_data'; 