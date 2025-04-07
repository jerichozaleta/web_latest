import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const HomeScreen = () => {
  const messages = [
    { name: 'Brix', status: 'online' },
    { name: 'Jeff', status: 'offline' },
    { name: 'Romnick', status: 'online' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      {/* Table Section */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>ID</Text>
          <Text style={styles.tableHeader}>Name</Text>
          <Text style={styles.tableHeader}>Date</Text>
          <Text style={styles.tableHeader}>Location</Text>
          <Text style={styles.tableHeader}>Reports</Text>
          <Text style={styles.tableHeader}>Status</Text>
        </View>
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
          </View>
        ))}
      </View>

      {/* Messages Section */}
      <View style={styles.messages}>
        <Text style={styles.messagesTitle}>Messages:</Text>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.messageItem}>
              <View style={styles.messageIcon}></View>
              <Text style={styles.messageText}>{item.name}</Text>
              <View
                style={[
                  styles.statusIndicator,
                  item.status === 'online' ? styles.online : styles.offline,
                ]}
              />
            </View>
          )}
        />
      </View>

      {/* Map Section */}
      <View style={styles.map}>
        <Text style={styles.mapText}>Cararayan National High School</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  table: {
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  messages: {
    marginBottom: 16,
  },
  messagesTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#ccc',
    borderRadius: 12,
    marginRight: 8,
  },
  messageText: {
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  online: {
    backgroundColor: 'green',
  },
  offline: {
    backgroundColor: 'gray',
  },
  map: {
    height: 200,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
