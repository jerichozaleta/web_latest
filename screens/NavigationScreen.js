import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const initialRegion = {
  latitude: 13.6287846,
  longitude: 123.2374283,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const WebViewComponent = (props: any) => {
  if (Platform.OS === 'web') {
    return <Text>WebView is not supported on this platform</Text>;
  } else {
    const { WebView } = require('react-native-webview');
    return <WebView {...props} />;
  }
};

const NavigationScreen = () => {
  const leafletHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        #map { width: 100%; height: 100%; margin: 0; padding: 0; }
        html, body { height: 100%; margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        const map = L.map('map').setView([${initialRegion.latitude}, ${initialRegion.longitude}], 16);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © OpenStreetMap contributors',
        }).addTo(map);
        L.marker([${initialRegion.latitude}, ${initialRegion.longitude}])
          .addTo(map)
          .bindPopup('Initial Location')
          .openPopup();
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>Navigation</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search location"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={{ fontSize: 18 }}>🔍</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.listContainer}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>🚨 Incident #{index + 1}</Text>
              <Text style={styles.subText}>🧑 Admin Location: Bicol University</Text>
              <Text style={styles.subText}>📍 Incident Location: Zone 4</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.mapContainer}>
          {Platform.OS === 'web' ? (
            <iframe
              srcDoc={leafletHtml}
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Map"
            />
          ) : (
            <WebViewComponent source={{ html: leafletHtml }} style={{ flex: 1 }} />
          )}
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>🆔 Incident Details</Text>
          <Text style={styles.subText}>Location: Zone 4</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>📩 Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>📞 Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f2f5',
  },
  leftContainer: {
    flex: 1,
    padding: 15,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fafafa',
  },
  filterButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: '#007AFF',
    borderRadius: 10,
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fdfdfd',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#555',
  },
  rightContainer: {
    flex: 2,
    padding: 15,
  },
  mapContainer: {
    flex: 1.5,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#e1e4e8',
  },
  bottomContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  bottomText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default NavigationScreen;