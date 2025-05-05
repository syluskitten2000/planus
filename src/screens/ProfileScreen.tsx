import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Avatar, List, Divider, Portal, Modal, TextInput } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Profile: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { user, signOut, updateUser } = useAuth();
  const [visible, setVisible] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      if (!user) return;

      await updateUser({
        ...user,
        name: newName,
      });
      setVisible(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text 
          size={80} 
          label={user?.name?.charAt(0) || 'U'} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Button 
          mode="outlined" 
          onPress={() => setVisible(true)}
          style={styles.editButton}
        >
          Chỉnh sửa hồ sơ
        </Button>
      </View>

      <Divider style={styles.divider} />

      <List.Section>
        <List.Item
          title="Cài đặt"
          left={props => <List.Icon {...props} icon="cog" />}
          onPress={() => {}}
        />
        <List.Item
          title="Trợ giúp"
          left={props => <List.Icon {...props} icon="help-circle" />}
          onPress={() => {}}
        />
        <List.Item
          title="Đăng xuất"
          left={props => <List.Icon {...props} icon="logout" />}
          onPress={handleSignOut}
        />
      </List.Section>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>Chỉnh sửa hồ sơ</Text>
          <TextInput
            label="Tên"
            value={newName}
            onChangeText={setNewName}
            mode="outlined"
            style={styles.input}
          />
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => setVisible(false)}
              style={styles.modalButton}
            >
              Hủy
            </Button>
            <Button
              mode="contained"
              onPress={handleUpdateProfile}
              loading={loading}
              disabled={loading || !newName}
              style={styles.modalButton}
            >
              Lưu
            </Button>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    backgroundColor: '#FF9999',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    borderColor: '#FF9999',
  },
  divider: {
    marginVertical: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: 8,
  },
}); 