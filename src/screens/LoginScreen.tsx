import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    userid?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!userid) {
      newErrors.userid = 'Vui lòng nhập tên đăng nhập';
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await signIn(userid, password);
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Đăng nhập</Text>
        
        <TextInput
          label="Tên đăng nhập"
          value={userid}
          onChangeText={setUserid}
          mode="outlined"
          style={styles.input}
          error={!!errors.userid}
        />
        <HelperText type="error" visible={!!errors.userid}>
          {errors.userid}
        </HelperText>

        <TextInput
          label="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          error={!!errors.password}
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password}
        </HelperText>

        <Button
          mode="text"
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotPassword}
        >
          Quên mật khẩu?
        </Button>

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
        >
          Đăng nhập
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        >
          Chưa có tài khoản? Đăng ký
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  content: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  button: {
    marginTop: 16,
  },
}); 