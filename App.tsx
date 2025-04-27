import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import MoodScreen from './src/screens/MoodScreen';
import PreferencesScreen from './src/screens/PreferencesScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import HistoryScreen from './src/screens/HistoryScreen';

// Types
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
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

// Theme
const theme = {
  colors: {
    primary: '#FF9999',
    accent: '#99CCFF',
    background: '#FFF5F5',
    surface: '#FFFFFF',
    text: '#333333',
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.text,
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ForgotPassword" 
            component={ForgotPasswordScreen}
            options={{ 
              title: 'Quên mật khẩu',
              headerShown: true,
            }}
          />
          <Stack.Screen 
            name="Mood" 
            component={MoodScreen}
            options={{ title: 'Chọn không khí' }}
          />
          <Stack.Screen 
            name="Preferences" 
            component={PreferencesScreen}
            options={{ title: 'Tùy chọn' }}
          />
          <Stack.Screen 
            name="Schedule" 
            component={ScheduleScreen}
            options={{ title: 'Lịch trình' }}
          />
          <Stack.Screen 
            name="Confirmation" 
            component={ConfirmationScreen}
            options={{ title: 'Xác nhận' }}
          />
          <Stack.Screen 
            name="History" 
            component={HistoryScreen}
            options={{ title: 'Lịch sử' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
} 