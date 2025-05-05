import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, IconButton, Avatar, List } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { Message } from '../types/user';
import { messages } from '../mocks/users';
import { useAuth } from '../contexts/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params;
  const { user: currentUser } = useAuth();
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Load messages for this chat
    const chatMessages = messages.filter(
      msg => 
        (msg.senderId === currentUser?.id && msg.receiverId === userId) ||
        (msg.senderId === userId && msg.receiverId === currentUser?.id)
    );
    setMessageList(chatMessages);
  }, [userId, currentUser]);

  const handleSendMessage = () => {
    if (newMessage.trim() && currentUser) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        receiverId: userId,
        content: newMessage,
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      setMessageList(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView style={styles.messagesContainer}>
        {messageList.map(message => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.senderId === currentUser?.id
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.content}</Text>
            <Text style={styles.timeText}>{formatTime(message.timestamp)}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <IconButton
          icon="send"
          size={24}
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF9999',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
    color: '#333333',
  },
  timeText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
});

export default ChatScreen; 