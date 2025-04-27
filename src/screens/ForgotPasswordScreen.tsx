import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, HelperText, Snackbar } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authService } from '../services/api';
import * as EmailValidator from 'email-validator';

type RootStackParamList = {
  ForgotPassword: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const validateEmail = () => {
    return email.length === 0 || EmailValidator.validate(email);
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setError('');

      if (!email) {
        throw new Error('Vui lòng nhập email');
      }

      if (!EmailValidator.validate(email)) {
        throw new Error('Email không hợp lệ');
      }

      await authService.forgotPassword(email);
      setSuccess(true);
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
        <Text style={styles.title}>Quên mật khẩu</Text>
        <Text style={styles.subtitle}>
          Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
        </Text>
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
          disabled={success}
        />
        <HelperText type="error" visible={!validateEmail()}>
          Email không hợp lệ
        </HelperText>

        {success ? (
          <>
            <Text style={styles.successText}>
              Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Login')}
              style={styles.button}
            >
              Quay lại đăng nhập
            </Button>
          </>
        ) : (
          <Button
            mode="contained"
            onPress={handleResetPassword}
            style={styles.button}
            loading={loading}
            disabled={loading || !email || !validateEmail()}
          >
            Gửi yêu cầu
          </Button>
        )}
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
    textAlign: 'center',
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
  successText: {
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  snackbar: {
    backgroundColor: '#FF4444',
  },
}); 