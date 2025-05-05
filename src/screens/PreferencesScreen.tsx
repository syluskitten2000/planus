import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Preferences'>;

const PreferencesScreen: React.FC<Props> = ({ route }) => {
  const { moodType } = route.params;

  return (
    <View style={styles.container}>
      <Text>Preferences Screen for mood: {moodType}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PreferencesScreen; 