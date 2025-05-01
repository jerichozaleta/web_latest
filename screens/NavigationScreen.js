import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const initialRegion = {
  latitude: 13.6287846,
  longitude: 123.2374283,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Define Cararayan boundary data
const cararayanCorners = [
  { lat: 13.6357, lng: 123.2334, name: 'Cararayan North' },
  { lat: 13.6257, lng: 123.2434, name: 'Cararayan East' },
  { lat: 13.6157, lng: 123.2334, name: 'Cararayan South' },
  { lat: 13.6257, lng: 123.2234, name: 'Cararayan West' },
  { lat: 13.6327, lng: 123.2404, name: 'Cararayan Northeast' },
  { lat: 13.6177, lng: 123.2404, name: 'Cararayan Southeast' },
  { lat: 13.6177, lng: 123.2264, name: 'Cararayan Southwest' },
  { lat: 13.6327, lng: 123.2264, name: 'Cararayan Northwest' }
];

// Define street corners/nodes throughout Cararayan
// This represents a grid of streets covering the Cararayan area
const cararayanStreetNodes = [
  // Main streets running North-South
  { lat: 13.6337, lng: 123.2274, name: 'Maharlika Highway & 1st St' },
  { lat: 13.6337, lng: 123.2304, name: 'Maharlika Highway & 2nd St' },
  { lat: 13.6337, lng: 123.2334, name: 'Maharlika Highway & 3rd St' },
  { lat: 13.6337, lng: 123.2364, name: 'Maharlika Highway & 4th St' },
  { lat: 13.6337, lng: 123.2394, name: 'Maharlika Highway & 5th St' },
  
  { lat: 13.6297, lng: 123.2274, name: 'Central Road & 1st St' },
  { lat: 13.6297, lng: 123.2304, name: 'Central Road & 2nd St' },
  { lat: 13.6297, lng: 123.2334, name: 'Central Road & 3rd St' },
  { lat: 13.6297, lng: 123.2364, name: 'Central Road & 4th St' },
  { lat: 13.6297, lng: 123.2394, name: 'Central Road & 5th St' },
  
  { lat: 13.6257, lng: 123.2274, name: 'Market Road & 1st St' },
  { lat: 13.6257, lng: 123.2304, name: 'Market Road & 2nd St' },
  { lat: 13.6257, lng: 123.2334, name: 'Market Road & 3rd St' },
  { lat: 13.6257, lng: 123.2364, name: 'Market Road & 4th St' },
  { lat: 13.6257, lng: 123.2394, name: 'Market Road & 5th St' },
  
  { lat: 13.6217, lng: 123.2274, name: 'School Road & 1st St' },
  { lat: 13.6217, lng: 123.2304, name: 'School Road & 2nd St' },
  { lat: 13.6217, lng: 123.2334, name: 'School Road & 3rd St' },
  { lat: 13.6217, lng: 123.2364, name: 'School Road & 4th St' },
  { lat: 13.6217, lng: 123.2394, name: 'School Road & 5th St' },
  
  { lat: 13.6177, lng: 123.2274, name: 'Southern Road & 1st St' },
  { lat: 13.6177, lng: 123.2304, name: 'Southern Road & 2nd St' },
  { lat: 13.6177, lng: 123.2334, name: 'Southern Road & 3rd St' },
  { lat: 13.6177, lng: 123.2364, name: 'Southern Road & 4th St' },
  { lat: 13.6177, lng: 123.2394, name: 'Southern Road & 5th St' },
  
  // Additional key locations
  { lat: 13.6287, lng: 123.2374, name: 'Cararayan Plaza' },
  { lat: 13.6247, lng: 123.2344, name: 'Cararayan Elementary School' },
  { lat: 13.6267, lng: 123.2314, name: 'Cararayan Health Center' },
  { lat: 13.6307, lng: 123.2344, name: 'Cararayan Church' },
  { lat: 13.6227, lng: 123.2374, name: 'Cararayan Market' },
  
  // Additional street intersections (diagonal streets)
  { lat: 13.6317, lng: 123.2284, name: 'Diagonal Ave & 1st St' },
  { lat: 13.6297, lng: 123.2314, name: 'Diagonal Ave & 2nd St' },
  { lat: 13.6277, lng: 123.2344, name: 'Diagonal Ave & 3rd St' },
  { lat: 13.6257, lng: 123.2374, name: 'Diagonal Ave & 4th St' },
  { lat: 13.6237, lng: 123.2404, name: 'Diagonal Ave & 5th St' }
];

// Conditionally import WebView to avoid issues on web
const WebViewComponent = (props) => {
  if (Platform.OS === 'web') {
    return <iframe {...props} style={{ width: '100%', height: '100%', border: 'none' }} />;
  } else {
    const { WebView } = require('react-native-webview');
    return <WebView {...props} style={{ flex: 1 }} />;
  }
};

const NavigationScreen = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch('http://192.168.100.72:10000/api/sos/all/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Raw API response:', data);

        if (Array.isArray(data)) {
          setIncidents(data);
        } else if (data.location) {
          setIncidents([data.location]);
        } else {
          setIncidents([]);
        }
      } catch (error) {
        console.error('Error fetching incidents:', error);
        setIncidents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const generateMapMarkers = () => {
    // Main marker for Cararayan
    let markers = `
      // Main reference point for Cararayan
      L.marker([${initialRegion.latitude}, ${initialRegion.longitude}])
        .addTo(map)
        .bindPopup('Cararayan, Naga City<br>Lat: ${initialRegion.latitude.toFixed(4)}, Lng: ${initialRegion.longitude.toFixed(4)}');
      
      // Add markers for each boundary point of Cararayan
      const cararayanBoundaries = ${JSON.stringify(cararayanCorners)};
      
      // Add markers for each boundary point
      cararayanBoundaries.forEach(point => {
        // Create a custom icon for corner markers
        const cornerIcon = L.divIcon({
          className: 'corner-marker',
          html: '<div style="background-color: #3388ff; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff;"></div>',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });
        
        L.marker([point.lat, point.lng], {icon: cornerIcon})
          .addTo(map)
          .bindPopup(point.name + '<br>Lat: ' + point.lat.toFixed(4) + ', Lng: ' + point.lng.toFixed(4));
      });
      
      // Create a polygon showing the approximate boundary of Cararayan
      const boundaryCoords = cararayanBoundaries.map(point => [point.lat, point.lng]);
      L.polygon(boundaryCoords, {
        color: '#3388ff',
        weight: 2,
        fillColor: '#3388ff',
        fillOpacity: 0.1
      }).addTo(map).bindPopup('Cararayan Boundary');
      
      // Add street corners/nodes
      const streetNodes = ${JSON.stringify(cararayanStreetNodes)};
      
      // Create a custom icon for street nodes
      const streetNodeIcon = L.divIcon({
        className: 'street-node-marker',
        html: '<div style="background-color: #ffa500; width: 8px; height: 8px; border-radius: 50%; border: 1px solid #fff;"></div>',
        iconSize: [10, 10],
        iconAnchor: [5, 5]
      });
      
      // Add markers for each street node
      streetNodes.forEach(node => {
        L.marker([node.lat, node.lng], {icon: streetNodeIcon})
          .addTo(map)
          .bindPopup(node.name + '<br>Lat: ' + node.lat.toFixed(4) + ', Lng: ' + node.lng.toFixed(4));
      });
      
      // Add street lines connecting nodes
      // Group nodes by street names to create street lines
      const streets = {};
      
      // Extract street names from the nodes
      streetNodes.forEach(node => {
        const streetName = node.name.split(' & ')[0];
        if (!streets[streetName]) {
          streets[streetName] = [];
        }
        streets[streetName].push([node.lat, node.lng]);
      });
      
      // Draw lines for each street
      Object.keys(streets).forEach(streetName => {
        if (streets[streetName].length > 1) {
          L.polyline(streets[streetName], {
            color: '#ff6b6b',
            weight: 3,
            opacity: 0.7,
            dashArray: '5, 10'
          }).addTo(map).bindPopup(streetName);
        }
      });
    `;

    // Add incident markers
    incidents
      .filter((incident) => incident.latitude && incident.longitude)
      .forEach((incident) => {
        markers += `
          L.marker([${incident.latitude}, ${incident.longitude}])
            .addTo(map)
            .bindPopup('User: ${incident.username || 'Unknown'}<br>Lat: ${incident.latitude.toFixed(4)}, Lng: ${incident.longitude.toFixed(4)}');
        `;
      });

    return markers;
  };

  const leafletHtml = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
      <style>
        html, body { 
          height: 100%; 
          margin: 0; 
          padding: 0; 
        }
        #map { 
          width: 100%; 
          height: 100%; 
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
        .street-node-marker div {
          transition: all 0.2s ease;
        }
        .street-node-marker div:hover {
          transform: scale(1.5);
          background-color: #ff4500 !important;
        }
        .corner-marker div {
          transition: all 0.2s ease;
        }
        .corner-marker div:hover {
          transform: scale(1.5);
          background-color: #0056b3 !important;
        }
        .leaflet-popup-content {
          font-family: Arial, sans-serif;
          font-size: 12px;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          const map = L.map('map', {
            center: [${initialRegion.latitude}, ${initialRegion.longitude}],
            zoom: 16,  // Increased zoom to better see street details
            zoomControl: true
          });
          
          // Standard OpenStreetMap tiles
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
          }).addTo(map);
          
          // Alternative map styles (uncomment one of these to use instead)
          
          // Topographic style
          // const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          //   attribution: '© OpenStreetMap contributors, © OpenTopoMap',
          //   maxZoom: 17
          // });
          
          // Light/minimal style
          // const lightLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
          //   attribution: '© OpenStreetMap contributors, © CARTO',
          //   maxZoom: 19
          // });
          
          // Dark style
          // const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
          //   attribution: '© OpenStreetMap contributors, © CARTO',
          //   maxZoom: 19
          // });
          
          // To switch between layers, you could create a layer control
          // Example: 
          // const baseLayers = {
          //   "Standard": baseLayer,
          //   "Topographic": topoLayer,
          //   "Light": lightLayer,
          //   "Dark": darkLayer
          // };
          // L.control.layers(baseLayers).addTo(map);
          
          // Add markers
          ${generateMapMarkers()}
          
          // Ensure map is properly displayed by triggering a resize after a short delay
          setTimeout(function() {
            map.invalidateSize();
          }, 100);
          
          // Improve map usability
          map.attributionControl.setPrefix(''); // Remove Leaflet attribution prefix
          
          // Add scale control at bottom left
          L.control.scale({
            imperial: false,  // Set to true if you want both metric and imperial
            position: 'bottomleft'
          }).addTo(map);
        });
      </script>
    </body>
    </html>`;

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
            <Text style={styles.buttonEmoji}>🔍</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : incidents.length === 0 ? (
            <Text style={styles.subText}>No incidents found. Please check back later.</Text>
          ) : (
            incidents.map((incident, index) => (
              <View key={incident._id || index} style={styles.listItem}>
                <Text style={styles.listItemText}>🚨 Incident #{index + 1}</Text>
                <Text style={styles.subText}>🧑 Admin: {incident.username || 'Unknown'}</Text>
                <Text style={styles.subText}>
                  📍 Location: Lat {incident.latitude?.toFixed(4) || 'N/A'}, Lng {incident.longitude?.toFixed(4) || 'N/A'}
                </Text>
              </View>
            ))
          )}
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
            <WebViewComponent
              ref={webViewRef}
              source={{ html: leafletHtml }}
              originWhitelist={['*']}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              renderLoading={() => <ActivityIndicator size="large" color="#007AFF" style={styles.mapLoading} />}
              onError={(e) => console.error('WebView error:', e.nativeEvent)}
            />
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
  buttonEmoji: {
    fontSize: 18,
    color: '#fff',
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
  mapLoading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
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