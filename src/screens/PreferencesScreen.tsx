import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Chip, TextInput } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Preferences: {
    moodType: string;
  };
  Schedule: {
    moodType: string;
    area: string;
    budget: string;
    timeSlot: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Preferences'>;

const areas = [
  { label: 'Hoàn Kiếm', value: 'hoan-kiem' },
  { label: 'Ba Đình', value: 'ba-dinh' },
  { label: 'Tây Hồ', value: 'tay-ho' },
  { label: 'Hai Bà Trưng', value: 'hai-ba-trung' },
  { label: 'Đống Đa', value: 'dong-da' },
  { label: 'Cầu Giấy', value: 'cau-giay' },
  { label: 'Nam Từ Liêm', value: 'nam-tu-liem' },
  { label: 'Bắc Từ Liêm', value: 'bac-tu-liem' },
  { label: 'Long Biên', value: 'long-bien' },
  { label: 'Thanh Xuân', value: 'thanh-xuan' },
];

const budgets = [
  { label: 'Dưới 200k', value: 'low' },
  { label: '200k - 500k', value: 'medium' },
  { label: '500k - 1 triệu', value: 'high' },
  { label: 'Trên 1 triệu', value: 'luxury' },
];

const timeSlots = [
  { label: 'Buổi sáng (7h-11h)', value: 'morning' },
  { label: 'Buổi trưa (11h-14h)', value: 'noon' },
  { label: 'Buổi chiều (14h-18h)', value: 'afternoon' },
  { label: 'Buổi tối (18h-22h)', value: 'evening' },
];

export default function PreferencesScreen({ navigation, route }: Props) {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const handleContinue = () => {
    if (selectedArea && selectedBudget && selectedTimeSlot) {
      navigation.navigate('Schedule', {
        moodType: route.params.moodType,
        area: selectedArea,
        budget: selectedBudget,
        timeSlot: selectedTimeSlot,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Khu vực</Text>
        <View style={styles.chipContainer}>
          {areas.map((area) => (
            <Chip
              key={area.value}
              selected={selectedArea === area.value}
              onPress={() => setSelectedArea(area.value)}
              style={styles.chip}
              selectedColor="#FF9999"
            >
              {area.label}
            </Chip>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ngân sách</Text>
        <View style={styles.chipContainer}>
          {budgets.map((budget) => (
            <Chip
              key={budget.value}
              selected={selectedBudget === budget.value}
              onPress={() => setSelectedBudget(budget.value)}
              style={styles.chip}
              selectedColor="#FF9999"
            >
              {budget.label}
            </Chip>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thời gian</Text>
        <View style={styles.chipContainer}>
          {timeSlots.map((timeSlot) => (
            <Chip
              key={timeSlot.value}
              selected={selectedTimeSlot === timeSlot.value}
              onPress={() => setSelectedTimeSlot(timeSlot.value)}
              style={styles.chip}
              selectedColor="#FF9999"
            >
              {timeSlot.label}
            </Chip>
          ))}
        </View>
      </View>

      <Button
        mode="contained"
        onPress={handleContinue}
        style={styles.button}
        disabled={!selectedArea || !selectedBudget || !selectedTimeSlot}
      >
        Gợi ý kế hoạch
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 25,
    backgroundColor: '#FF9999',
  },
}); 