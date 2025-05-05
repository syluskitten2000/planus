import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Confirmation'>;

const ConfirmationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { schedule } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Xác nhận kế hoạch</Text>
      {schedule.map((item, index) => (
        <View key={index} style={styles.scheduleItem}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.activity}>{item.activity}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      ))}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
      >
        Xác nhận
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scheduleItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9999',
  },
  activity: {
    fontSize: 16,
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 25,
    backgroundColor: '#FF9999',
  },
});

export default ConfirmationScreen; 