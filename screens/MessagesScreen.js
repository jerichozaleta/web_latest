import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MessagesScreen = ({ navigation }) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', name: 'Brix Cortez', action: 'Send location', time: '2m ago', unread: true },
    { id: '2', name: 'Brix Cortez', action: 'Send location', time: '1h ago', unread: false },
    { id: '3', name: 'Brix Cortez', action: 'Send location', time: '3h ago', unread: false },
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: '1', text: 'Live Location: Brix started sharing', sent: false, time: '10:30 AM', type: 'location' },
    { id: '2', text: 'I will locate you location right now.', sent: true, time: '10:32 AM', type: 'text' },
    { id: '3', text: 'okay.', sent: false, time: '10:33 AM', type: 'text' },
  ]);

  const [messageInput, setMessageInput] = useState('');

  const handleBackPress = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log('Back button pressed');
    }
  };

  // Simulate getting current location
  const handleSendLocation = (locationType) => {
    const locationMessage = locationType === 'live' 
      ? 'Live Location: Sharing location...'
      : 'Current Location: Calamba, Calabarzon, PH';
    
    const newMessage = {
      id: Date.now().toString(),
      text: locationMessage,
      sent: true,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      type: 'location',
      coordinates: { lat: 14.2117, lng: 121.1653 } // Calamba coordinates
    };

    setChatMessages([...chatMessages, newMessage]);
    setShowLocationModal(false);
    Alert.alert('Location Sent', `${locationType === 'live' ? 'Live' : 'Current'} location shared successfully`);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: messageInput,
        sent: true,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        type: 'text'
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Sidebar: Conversations List */}
      <View style={styles.sidebar}>
        <View style={styles.sidebarHeader}>
          <View style={styles.sidebarTitleContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackPress}
              activeOpacity={0.7}
            >
              <Icon name="arrow-back" size={24} color="#3b82f6" />
            </TouchableOpacity>
            <Text style={styles.sidebarTitle}>Messages</Text>
          </View>
        </View>
        
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor="#9ca3af"
          />
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.conversationItem, item.unread && styles.unreadItem]}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>
                {item.unread && <View style={styles.onlineIndicator} />}
              </View>
              
              <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.conversationName}>{item.name}</Text>
                  <Text style={styles.conversationTime}>{item.time}</Text>
                </View>
                <Text style={styles.conversationPreview}>{item.action}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Right: Chat Interface */}
      <View style={styles.chatContainer}>
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <View style={styles.chatHeaderLeft}>
            <View style={styles.chatAvatar}>
              <Text style={styles.chatAvatarText}>B</Text>
            </View>
            <View>
              <Text style={styles.chatHeaderName}>Brix Cortez</Text>
              <Text style={styles.chatHeaderStatus}>Active now</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Messages Area */}
        <ScrollView style={styles.messagesArea} contentContainerStyle={styles.messagesContent}>
          {chatMessages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sent ? styles.sentMessage : styles.receivedMessage,
              ]}
            >
              {message.type === 'location' && (
                <View style={styles.locationContainer}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <View style={styles.mapPlaceholder}>
                    <Text style={styles.mapText}>Map View</Text>
                  </View>
                </View>
              )}
              <Text style={[styles.messageText, message.sent && styles.sentMessageText]}>
                {message.text}
              </Text>
              <Text style={[styles.messageTime, message.sent && styles.sentMessageTime]}>
                {message.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputArea}>
          <TouchableOpacity 
            style={styles.attachButton}
            onPress={() => setShowLocationModal(true)}
          >
            <Text style={styles.attachButtonText}>📍</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            placeholderTextColor="#9ca3af"
            multiline
            value={messageInput}
            onChangeText={setMessageInput}
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location Modal */}
      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Share Location</Text>
              <TouchableOpacity onPress={() => setShowLocationModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalDescription}>
              Choose how you want to share your location
            </Text>

            <TouchableOpacity 
              style={styles.locationOption}
              onPress={() => handleSendLocation('current')}
            >
              <View style={styles.locationOptionIcon}>
                <Text style={styles.locationOptionEmoji}>📍</Text>
              </View>
              <View style={styles.locationOptionText}>
                <Text style={styles.locationOptionTitle}>Current Location</Text>
                <Text style={styles.locationOptionSubtitle}>Share your location once</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.locationOption}
              onPress={() => handleSendLocation('live')}
            >
              <View style={styles.locationOptionIcon}>
                <Text style={styles.locationOptionEmoji}>🔴</Text>
              </View>
              <View style={styles.locationOptionText}>
                <Text style={styles.locationOptionTitle}>Live Location</Text>
                <Text style={styles.locationOptionSubtitle}>Share for 15 minutes</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowLocationModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
  },
  
  // Sidebar Styles
  sidebar: {
    width: 340,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  sidebarHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sidebarTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    backgroundColor: '#ffffff',
  },
  unreadItem: {
    backgroundColor: '#f0f9ff',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  conversationTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  conversationPreview: {
    fontSize: 14,
    color: '#6b7280',
  },

  // Chat Container Styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  chatAvatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  chatHeaderName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },
  chatHeaderStatus: {
    fontSize: 13,
    color: '#10b981',
    marginTop: 2,
  },
  moreButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  moreButtonText: {
    fontSize: 24,
    color: '#6b7280',
  },

  // Messages Area
  messagesArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  messagesContent: {
    padding: 20,
  },
  messageBubble: {
    maxWidth: '70%',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e7eb',
    borderBottomLeftRadius: 4,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3b82f6',
    borderBottomRightRadius: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  mapPlaceholder: {
    flex: 1,
    height: 80,
    backgroundColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    color: '#6b7280',
    fontSize: 12,
  },
  messageText: {
    fontSize: 15,
    color: '#111827',
    lineHeight: 20,
  },
  sentMessageText: {
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
  },
  sentMessageTime: {
    color: '#dbeafe',
  },

  // Input Area
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  attachButtonText: {
    fontSize: 20,
  },
  messageInput: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    fontSize: 15,
    color: '#111827',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendIcon: {
    fontSize: 18,
    color: '#ffffff',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  modalClose: {
    fontSize: 24,
    color: '#6b7280',
  },
  modalDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  locationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 12,
  },
  locationOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locationOptionEmoji: {
    fontSize: 24,
  },
  locationOptionText: {
    flex: 1,
  },
  locationOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  locationOptionSubtitle: {
    fontSize: 13,
    color: '#6b7280',
  },
  cancelButton: {
    marginTop: 8,
    padding: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
});

export default MessagesScreen;