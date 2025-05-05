import React, { useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { Text, Card, Avatar, Button, Searchbar, ActivityIndicator } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { users } from '../mocks/users';
import { useAuth } from '../contexts/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Users'>;

const UsersScreen: React.FC<Props> = ({ navigation }) => {
  const { user: currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredUsers = users.filter(user => 
    user.id !== currentUser?.id &&
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleAddFriend = (userId: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const renderUserItem = ({ item }: { item: typeof users[0] }) => (
    <Card style={styles.userCard} onPress={() => navigation.navigate('Profile', { userId: item.id })}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.userInfo}>
          <Avatar.Image 
            size={50} 
            source={{ uri: item.avatar }} 
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userId}>@{item.userId}</Text>
            {item.location && (
              <Text style={styles.location}>
                📍 {item.location}
              </Text>
            )}
          </View>
        </View>
        {!item.isFriend && (
          <Button
            mode="contained"
            onPress={() => handleAddFriend(item.id)}
            loading={loading}
            disabled={loading}
            style={styles.addButton}
            labelStyle={styles.buttonLabel}
          >
            Kết bạn
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Tìm kiếm người dùng..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor="#FF9999"
        inputStyle={styles.searchInput}
      />
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF9999']}
            tintColor="#FF9999"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không tìm thấy người dùng</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  searchBar: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    borderRadius: 12,
  },
  searchInput: {
    fontSize: 14,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  userCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginRight: 12,
    backgroundColor: '#FFE5E5',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  userId: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#999999',
  },
  addButton: {
    backgroundColor: '#FF9999',
    borderRadius: 20,
    marginLeft: 12,
  },
  buttonLabel: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

export default UsersScreen; 