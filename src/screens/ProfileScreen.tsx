import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Avatar, List, Divider, Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { User } from '../types/user';
import { users } from '../mocks/users';
import { useAuth } from '../contexts/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ route, navigation }: Props) {
  const { userId } = route.params;
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const isCurrentUser = userId === currentUser?.id;

  useEffect(() => {
    const user = users.find(u => u.id === userId);
    setProfileUser(user || null);
  }, [userId]);

  if (!profileUser) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy người dùng</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text
          size={80}
          label={profileUser.name.split(' ').map(n => n[0]).join('')}
          style={styles.avatar}
        />
        <Text style={styles.name}>{profileUser.name}</Text>
        <Text style={styles.userid}>@{profileUser.userid}</Text>
        {!isCurrentUser && (
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Chat', { userId: profileUser.id })}
            style={styles.messageButton}
          >
            Nhắn tin
          </Button>
        )}
      </View>

      <List.Section>
        <List.Subheader>Thông tin cá nhân</List.Subheader>
        {profileUser.bio && (
          <List.Item
            title="Giới thiệu"
            description={profileUser.bio}
            left={props => <List.Icon {...props} icon="account" />}
          />
        )}
        {profileUser.location && (
          <List.Item
            title="Địa điểm"
            description={profileUser.location}
            left={props => <List.Icon {...props} icon="map-marker" />}
          />
        )}
        <List.Item
          title="Tham gia"
          description={new Date(profileUser.createdAt).toLocaleDateString('vi-VN')}
          left={props => <List.Icon {...props} icon="calendar" />}
        />
      </List.Section>

      {profileUser.interests && profileUser.interests.length > 0 && (
        <List.Section>
          <List.Subheader>Sở thích</List.Subheader>
          <View style={styles.interestsContainer}>
            {profileUser.interests.map((interest, index) => (
              <View key={index} style={styles.interestChip}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </List.Section>
      )}
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
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
  },
  avatar: {
    backgroundColor: '#FF9999',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userid: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  messageButton: {
    marginTop: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  interestChip: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: '#FF9999',
  },
}); 