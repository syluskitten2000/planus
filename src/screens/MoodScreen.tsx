import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Card, Text, IconButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';

type RootStackParamList = {
  Mood: undefined;
  Preferences: {
    moodType: string;
  };
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Mood'>;

const moodOptions = [
  {
    id: 'romantic',
    title: 'Lãng mạn',
    icon: '🌸',
    description: 'Những địa điểm lãng mạn, ấm cúng',
  },
  {
    id: 'food',
    title: 'Tour ẩm thực',
    icon: '🍜',
    description: 'Khám phá ẩm thực địa phương',
  },
  {
    id: 'entertainment',
    title: 'Phim + Cafe',
    icon: '🎬',
    description: 'Xem phim và thư giãn tại quán cafe',
  },
  {
    id: 'adventure',
    title: 'Phiêu lưu',
    icon: '🎡',
    description: 'Các hoạt động vui chơi, giải trí',
  },
];

export default function MoodScreen({ navigation }: Props) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.question}>Bạn muốn hôm nay như thế nào?</Text>
        <IconButton
          icon="account"
          size={24}
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileButton}
        />
      </View>
      <ScrollView style={styles.optionsContainer}>
        {moodOptions.map((option) => (
          <Card
            key={option.id}
            style={styles.card}
            onPress={() => navigation.navigate('Preferences', { moodType: option.id })}
          >
            <Card.Content style={styles.cardContent}>
              <Text style={styles.icon}>{option.icon}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{option.title}</Text>
                <Text style={styles.cardDescription}>{option.description}</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  profileButton: {
    margin: 0,
  },
  optionsContainer: {
    flex: 1,
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    fontSize: 32,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
}); 