import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Alert } from 'react-native';
import { Text, Card, Button, Avatar, List, Divider, IconButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import { users } from '../mocks/users';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface HistoryItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: '1',
      title: 'Kế hoạch cuối tuần',
      description: '2 ngày trước',
      icon: 'calendar',
    },
    {
      id: '2',
      title: 'Đi chơi với bạn bè',
      description: '1 tuần trước',
      icon: 'account-group',
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleDeleteHistory = (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa mục này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setHistoryItems(prevItems => prevItems.filter(item => item.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderFriendItem = ({ item }: { item: typeof users[0] }) => (
    <List.Item
      title={item.name}
      description={`@${item.userId}`}
      left={props => (
        <Avatar.Image
          {...props}
          size={50}
          source={{ uri: item.avatar }}
          style={styles.avatar}
        />
      )}
      onPress={() => navigation.navigate('Profile', { userId: item.id })}
      style={styles.friendItem}
    />
  );

  const handleProfilePress = () => {
    if (user?.id) {
      navigation.navigate('Profile', { userId: user.id });
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#FF9999']}
          tintColor="#FF9999"
        />
      }
    >
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>Xin chào,</Text>
              <Text style={styles.nameText}>{user?.name}</Text>
            </View>
            <IconButton
              icon="account"
              size={24}
              iconColor="#FFFFFF"
              onPress={handleProfilePress}
            />
          </View>
          <Text style={styles.subtitle}>Hôm nay bạn muốn làm gì?</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Card style={styles.quickActionCard}>
          <Card.Content>
            <View style={styles.quickActionHeader}>
              <Text style={styles.cardTitle}>Bắt đầu kế hoạch mới</Text>
              <IconButton
                icon="plus-circle"
                size={24}
                iconColor="#FF9999"
                onPress={() => navigation.navigate('Mood')}
              />
            </View>
            <Text style={styles.cardDescription}>
              Tạo kế hoạch phù hợp với tâm trạng và sở thích của bạn
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Mood')}
              style={styles.startButton}
              labelStyle={styles.buttonLabel}
            >
              Bắt đầu ngay
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Bạn bè đang hoạt động</Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('Users')}
                labelStyle={styles.viewAllLabel}
              >
                Xem tất cả
              </Button>
            </View>
            <List.Section>
              {users
                .filter(u => u.isFriend)
                .slice(0, 3)
                .map((friend, index) => (
                  <React.Fragment key={friend.id}>
                    {renderFriendItem({ item: friend })}
                    {index < 2 && <Divider style={styles.divider} />}
                  </React.Fragment>
                ))}
            </List.Section>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Lịch sử gần đây</Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('History')}
                labelStyle={styles.viewAllLabel}
              >
                Xem tất cả
              </Button>
            </View>
            <List.Section>
              {historyItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <List.Item
                    title={item.title}
                    description={item.description}
                    left={props => (
                      <View style={styles.historyIconContainer}>
                        <List.Icon {...props} icon={item.icon} color="#FF9999" />
                      </View>
                    )}
                    right={props => (
                      <IconButton
                        {...props}
                        icon="delete"
                        size={20}
                        iconColor="#FF9999"
                        onPress={() => handleDeleteHistory(item.id)}
                      />
                    )}
                    style={styles.historyItem}
                  />
                  {index < historyItems.length - 1 && <Divider style={styles.divider} />}
                </React.Fragment>
              ))}
              {historyItems.length === 0 && (
                <Text style={styles.emptyHistoryText}>Không có lịch sử gần đây</Text>
              )}
            </List.Section>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerBackground: {
    height: 200,
    backgroundColor: '#FF9999',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    padding: 16,
    marginTop: -30,
  },
  quickActionCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    marginBottom: 20,
  },
  quickActionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#FF9999',
    borderRadius: 15,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  viewAllLabel: {
    fontSize: 12,
    color: '#FF9999',
  },
  friendItem: {
    paddingVertical: 8,
  },
  avatar: {
    backgroundColor: '#FFE5E5',
  },
  divider: {
    marginVertical: 4,
  },
  historyItem: {
    paddingVertical: 8,
  },
  historyIconContainer: {
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: 8,
  },
  emptyHistoryText: {
    textAlign: 'center',
    color: '#666666',
    paddingVertical: 16,
  },
});

export default HomeScreen; 