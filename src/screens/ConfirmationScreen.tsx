import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, List } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Confirmation: {
    schedule: Array<{
      time: string;
      activity: string;
      location: string;
    }>;
  };
  History: undefined;
  Welcome: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Confirmation'>;

export default function ConfirmationScreen({ navigation, route }: Props) {
  const { schedule } = route.params;

  const handleViewHistory = () => {
    navigation.navigate('History');
  };

  const handleCreateNew = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.successContainer}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.title}>Kế hoạch đã được lưu!</Text>
          </View>

          <View style={styles.scheduleContainer}>
            {schedule.map((item, index) => (
              <List.Item
                key={index}
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

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={handleCreateNew}
          style={[styles.button, styles.newButton]}
          textColor="#FF9999"
        >
          Tạo kế hoạch mới
        </Button>
        <Button
          mode="contained"
          onPress={handleViewHistory}
          style={[styles.button, styles.historyButton]}
        >
          Xem lịch sử
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successIcon: {
    fontSize: 48,
    color: '#4CAF50',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  scheduleContainer: {
    marginTop: 20,
  },
  scheduleItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  timeContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF5F5',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9999',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
    borderRadius: 25,
  },
  newButton: {
    borderColor: '#FF9999',
  },
  historyButton: {
    backgroundColor: '#FF9999',
  },
}); 