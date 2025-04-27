import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text, List, IconButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  History: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

// This would normally come from storage/API
const savedSchedules = [
  {
    date: '28 thg 4, 2024',
    type: 'Tour ẩm thực',
    activities: [
      { time: '17:00', activity: 'Ăn vặt', location: 'Phố Hàng Ngang - Hàng Đào' },
      { time: '19:00', activity: 'Bữa tối', location: 'Phố Ẩm thực Tống Duy Tân' },
    ],
  },
  {
    date: '25 thg 4, 2024',
    type: 'Hoạt động vui vẻ',
    activities: [
      { time: '15:00', activity: 'Trò chơi', location: 'Timezone Royal City' },
      { time: '17:30', activity: 'Cafe', location: 'Cộng Cà Phê - Phố Đinh Liệt' },
      { time: '19:00', activity: 'Karaoke', location: 'Icool Karaoke - Trung Hòa' },
    ],
  },
];

export default function HistoryScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lịch sử lưu trữ</Text>

      {savedSchedules.map((schedule, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.date}>{schedule.date}</Text>
                <Text style={styles.type}>{schedule.type}</Text>
              </View>
              <IconButton
                icon="content-copy"
                size={20}
                onPress={() => {
                  // Handle reusing this schedule
                }}
              />
            </View>

            <View style={styles.scheduleContainer}>
              {schedule.activities.map((item, activityIndex) => (
                <List.Item
                  key={activityIndex}
                  title={item.activity}
                  description={item.location}
                  left={() => (
                    <View style={styles.timeContainer}>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  )}
                  style={styles.scheduleItem}
                />
              ))}
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  type: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  scheduleContainer: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
  },
  scheduleItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  timeContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF5F5',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF9999',
  },
}); 