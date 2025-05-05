import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

const { width, height } = Dimensions.get('window');

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFF5F5', '#FFE5E5']}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="heart-multiple" size={80} color="#FF9999" />
          <Text style={styles.appName}>PlanUs</Text>
          <Text style={styles.slogan}>Lên kế hoạch hẹn hò dễ dàng</Text>
        </View>

        <View style={styles.featureContainer}>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="emoticon-happy-outline" size={32} color="#FF9999" style={styles.featureIcon} />
            <Text style={styles.featureText}>Tùy chỉnh theo tâm trạng</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="map-marker-radius" size={32} color="#FF9999" style={styles.featureIcon} />
            <Text style={styles.featureText}>Gợi ý địa điểm phù hợp</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="calendar-clock" size={32} color="#FF9999" style={styles.featureIcon} />
            <Text style={styles.featureText}>Lập lịch trình tự động</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Đăng nhập
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Register')}
            style={styles.registerButton}
            contentStyle={styles.buttonContent}
            labelStyle={[styles.buttonLabel, styles.registerButtonLabel]}
          >
            Đăng ký
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Mood')}
            style={styles.skipButton}
            labelStyle={styles.skipButtonLabel}
          >
            Bỏ qua đăng nhập
          </Button>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.06,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF9999',
    marginBottom: 8,
    marginTop: 16,
  },
  slogan: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  featureContainer: {
    marginVertical: height * 0.05,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: height * 0.05,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#FF9999',
    marginBottom: 12,
    borderRadius: 24,
  },
  registerButton: {
    borderColor: '#FF9999',
    marginBottom: 12,
    borderRadius: 24,
  },
  registerButtonLabel: {
    color: '#FF9999',
  },
  skipButton: {
    marginTop: 8,
  },
  skipButtonLabel: {
    fontSize: 14,
    color: '#666666',
  },
}); 