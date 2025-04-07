import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const MessagesScreen = () => {
  const messages = [
    { id: '1', name: 'Brix Cortez', action: 'Send location' },
    { id: '2', name: 'Brix Cortez', action: 'Send location' },
    { id: '3', name: 'Brix Cortez', action: 'Send location' },
  ];

  const chatMessages = [
    { id: '1', text: 'Live Location: Brix started sharing' },
    { id: '2', text: 'I will locate you location right now.' },
    { id: '3', text: 'okay.' },
  ];

  return (
    <View style={styles.container}>
      {/* Left: Message List */}
      <View style={styles.messageList}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
        />
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageItem}>
              <Text style={styles.messageName}>{item.name}</Text>
              <TouchableOpacity>
                <Text style={styles.messageAction}>{item.action}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Right: Chat Area */}
      <View style={styles.chatArea}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>Brix Cortez</Text>
        </View>
        <View style={styles.chatMessages}>
          {chatMessages.map((message) => (
            <View key={message.id} style={styles.chatBubble}>
              <Text style={styles.chatText}>{message.text}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatInput}
            placeholder="Write a message..."
          />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },
  messageList: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageName: {
    fontWeight: 'bold',
  },
  messageAction: {
    color: '#007BFF',
    marginTop: 5,
  },
  chatArea: {
    flex: 2,
    padding: 10,
    backgroundColor: '#fff',
  },
  chatHeader: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatMessages: {
    flex: 1,
    marginVertical: 10,
  },
  chatBubble: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  chatText: {
    fontSize: 16,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  chatInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MessagesScreen;
