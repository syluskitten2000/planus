import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import type { RootStackParamList } from './src/types/navigation';

// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import MoodScreen from './src/screens/MoodScreen';
import PreferencesScreen from './src/screens/PreferencesScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import UsersScreen from './src/screens/UsersScreen';
import ChatScreen from './src/screens/ChatScreen';

// Theme
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF9999',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FFE5E5',
    onPrimaryContainer: '#FF9999',
    secondary: '#FFB6C1',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E5F2FF',
    onSecondaryContainer: '#99CCFF',
    tertiary: '#FFC0CB',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFE5E5',
    onTertiaryContainer: '#FFB3B3',
    background: '#FFF5F5',
    onBackground: '#333333',
    surface: '#FFFFFF',
    onSurface: '#333333',
    surfaceVariant: '#FFE5E5',
    onSurfaceVariant: '#666666',
    error: '#FF5252',
    onError: '#FFFFFF',
    errorContainer: '#FFE5E5',
    onErrorContainer: '#FF5252',
    outline: '#CCCCCC',
    outlineVariant: '#E5E5E5',
    elevation: {
      level0: 'transparent',
      level1: '#FFFFFF',
      level2: '#FFFFFF',
      level3: '#FFFFFF',
      level4: '#FFFFFF',
      level5: '#FFFFFF',
    },
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.onBackground,
        headerShadowVisible: false,
      }}
    >
      {user ? (
        // Authenticated stack
        <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Mood" 
            component={MoodScreen}
            options={{ title: 'Chọn không khí' }}
          />
          <Stack.Screen 
            name="Preferences" 
            component={PreferencesScreen}
            options={{ title: 'Sở thích' }}
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
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: 'Hồ sơ' }}
          />
          <Stack.Screen 
            name="Users" 
            component={UsersScreen}
            options={{ title: 'Danh sách người dùng' }}
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen}
            options={{ title: 'Tin nhắn' }}
          />
        </>
      ) : (
        // Unauthenticated stack
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
} 