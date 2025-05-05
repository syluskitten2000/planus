import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, IconButton, Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';

type RootStackParamList = {
  Home: undefined;
  Mood: undefined;
  Profile: undefined;
  History: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Xin chào,</Text>
          <Text style={styles.name}>{user?.name}</Text>
        </View>
        <IconButton
          icon="account"
          size={24}
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileButton}
        />
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.quickActionCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Bắt đầu ngay</Text>
            <Text style={styles.cardDescription}>
              Lên kế hoạch cho buổi hẹn hò của bạn
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Mood')}
              style={styles.startButton}
            >
              Tạo kế hoạch mới
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Kế hoạch đã tạo</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Địa điểm đã thử</Text>
            </Card.Content>
          </Card>
        </View>

        <Card style={styles.recentCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Kế hoạch gần đây</Text>
            <View style={styles.recentItem}>
              <Text style={styles.recentDate}>Hôm qua</Text>
              <Text style={styles.recentTitle}>Tour ẩm thực Hà Nội</Text>
              <Text style={styles.recentDescription}>
                Khám phá ẩm thực đường phố Hà Nội
              </Text>
            </View>
            <View style={styles.recentItem}>
              <Text style={styles.recentDate}>Tuần trước</Text>
              <Text style={styles.recentTitle}>Buổi tối lãng mạn</Text>
              <Text style={styles.recentDescription}>
                Dinner và đi dạo quanh hồ
              </Text>
            </View>
            <Button
              mode="text"
              onPress={() => navigation.navigate('History')}
              style={styles.viewAllButton}
            >
              Xem tất cả
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
  },
  greeting: {
    fontSize: 16,
    color: '#666666',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileButton: {
    margin: 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  quickActionCard: {
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#FF9999',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9999',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  recentCard: {
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recentItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  recentDate: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recentDescription: {
    fontSize: 14,
    color: '#666666',
  },
  viewAllButton: {
    marginTop: 8,
  },
}); 