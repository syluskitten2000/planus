import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text, List, IconButton, Button, Portal, Modal, Dialog } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { ScheduleItem } from '../types/schedule';
import { schedules } from '../mocks/schedules';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

export default function HistoryScreen() {
  const [scheduleList, setScheduleList] = useState<ScheduleItem[]>(schedules);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(null);

  const handleDelete = (schedule: ScheduleItem) => {
    setSelectedSchedule(schedule);
    setDeleteDialogVisible(true);
  };

  const confirmDelete = () => {
    if (selectedSchedule) {
      setScheduleList(prev => prev.filter(item => item.id !== selectedSchedule.id));
      setDeleteDialogVisible(false);
      setSelectedSchedule(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {scheduleList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có lịch trình nào</Text>
          </View>
        ) : (
          scheduleList.map((schedule) => (
            <Card key={schedule.id} style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text style={styles.time}>{schedule.time}</Text>
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => handleDelete(schedule)}
                  />
                </View>
                <List.Item
                  title={schedule.activity}
                  description={schedule.location}
                  left={props => <List.Icon {...props} icon="calendar-check" />}
                />
                <View style={styles.details}>
                  <Text style={styles.detailText}>Tâm trạng: {schedule.moodType}</Text>
                  <Text style={styles.detailText}>Khu vực: {schedule.area}</Text>
                  <Text style={styles.detailText}>Ngân sách: {schedule.budget}</Text>
                  <Text style={styles.detailText}>Thời gian: {schedule.timeSlot}</Text>
                </View>
                <Text style={styles.dateText}>
                  Tạo lúc: {formatDate(schedule.createdAt)}
                </Text>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>

      <Portal>
        <Dialog
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}
        >
          <Dialog.Title>Xác nhận xóa</Dialog.Title>
          <Dialog.Content>
            <Text>Bạn có chắc chắn muốn xóa lịch trình này?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>Hủy</Button>
            <Button onPress={confirmDelete} textColor="red">Xóa</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
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
  },
  card: {
    margin: 8,
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9999',
  },
  details: {
    marginTop: 8,
    paddingLeft: 40,
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
    textAlign: 'right',
  },
}); 