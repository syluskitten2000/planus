import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText, Snackbar } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authService } from '../services/api';
import * as EmailValidator from 'email-validator';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterScreen({ navigation }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      errors.name = 'Vui lòng nhập họ tên';
    } else if (formData.name.length < 2) {
      errors.name = 'Họ tên phải có ít nhất 2 ký tự';
    }

    // Validate email
    if (!formData.email) {
      errors.email = 'Vui lòng nhập email';
    } else if (!EmailValidator.validate(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }

    // Validate password
    if (!formData.password) {
      errors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (!/\d/.test(formData.password)) {
      errors.password = 'Mật khẩu phải chứa ít nhất 1 số';
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = 'Mật khẩu phải chứa ít nhất 1 chữ thường';
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'Mật khẩu phải chứa ít nhất 1 chữ hoa';
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setLoading(true);
      setError('');

      await authService.register({
        name: formData.name.trim(),
        email: formData.email.toLowerCase(),
        password: formData.password,
      });

      // Đăng ký thành công, chuyển đến màn hình đăng nhập
      navigation.navigate('Login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Đã có lỗi xảy ra';
      setError(errorMessage);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        <Text style={styles.subtitle}>Tạo tài khoản để bắt đầu lên kế hoạch</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Họ tên"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          mode="outlined"
          style={styles.input}
          error={!!validationErrors.name}
        />
        <HelperText type="error" visible={!!validationErrors.name}>
          {validationErrors.name}
        </HelperText>

        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!validationErrors.email}
        />
        <HelperText type="error" visible={!!validationErrors.email}>
          {validationErrors.email}
        </HelperText>

        <TextInput
          label="Mật khẩu"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          mode="outlined"
          style={styles.input}
          secureTextEntry={!showPassword}
          error={!!validationErrors.password}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <HelperText type="error" visible={!!validationErrors.password}>
          {validationErrors.password}
        </HelperText>

        <TextInput
          label="Xác nhận mật khẩu"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          mode="outlined"
          style={styles.input}
          secureTextEntry={!showPassword}
          error={!!validationErrors.confirmPassword}
        />
        <HelperText type="error" visible={!!validationErrors.confirmPassword}>
          {validationErrors.confirmPassword}
        </HelperText>

        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
          loading={loading}
          disabled={loading}
        >
          Đăng ký
        </Button>

        <View style={styles.loginContainer}>
          <Text>Đã có tài khoản? </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
          >
            Đăng nhập
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
    paddingHorizontal: 20,
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
    padding: 20,
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
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginButton: {
    marginLeft: -8,
  },
  snackbar: {
    backgroundColor: '#FF4444',
  },
}); 