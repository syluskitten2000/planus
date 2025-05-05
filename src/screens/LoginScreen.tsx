import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, HelperText, Snackbar } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthService } from '../services/auth.service';
import * as EmailValidator from 'email-validator';
import { useAuth } from '../contexts/AuthContext';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Welcome: undefined;
  ForgotPassword: undefined;
  Mood: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const authService = new AuthService();

export default function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const validateEmail = () => {
    return email.length === 0 || EmailValidator.validate(email);
  };

  const validatePassword = () => {
    return password.length === 0 || password.length >= 6;
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      // Validation
      if (!email || !password) {
        throw new Error('Vui lòng nhập đầy đủ email và mật khẩu');
      }

      if (!EmailValidator.validate(email)) {
        throw new Error('Email không hợp lệ');
      }

      if (password.length < 6) {
        throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
      }

      // Call API
      const user = await authService.login(email, password);
      
      // Save auth data
      await signIn('', user);

      // Navigate to Mood screen
      navigation.replace('Mood');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra');
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PlanUs</Text>
        <Text style={styles.subtitle}>Đăng nhập để lên kế hoạch hẹn hò</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          error={!validateEmail()}
        />
        <HelperText type="error" visible={!validateEmail()}>
          Email không hợp lệ
        </HelperText>

        <TextInput
          label="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry={!showPassword}
          error={!validatePassword()}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <HelperText type="error" visible={!validatePassword()}>
          Mật khẩu phải có ít nhất 6 ký tự
        </HelperText>

        <Button
          mode="text"
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotButton}
        >
          Quên mật khẩu?
        </Button>

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          loading={loading}
          disabled={loading || !email || !password || !validateEmail() || !validatePassword()}
        >
          Đăng nhập
        </Button>

        <View style={styles.registerContainer}>
          <Text>Chưa có tài khoản? </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Register')}
            style={styles.registerButton}
          >
            Đăng ký ngay
          </Button>
        </View>
      </View>

      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF9999',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  form: {
    flex: 1,
  },
  input: {
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 24,
    paddingVertical: 6,
    backgroundColor: '#FF9999',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerButton: {
    marginLeft: -8,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 16,
  },
  snackbar: {
    backgroundColor: '#FF4444',
  },
}); 