import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

// Helper function to calculate the distance between two coordinates using the Haversine formula
const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLon / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const App = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [alertTriggered, setAlertTriggered] = useState(false);

  const targetLocation = { lat: 37.7749, lon: -122.4194 }; // Example: San Francisco

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      setHasLocationPermission(true);

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
    })();
  }, []);

  // Check the distance between the current location and the target location
  useEffect(() => {
    if (currentLocation && !alertTriggered) {
      const distance = getDistanceFromLatLonInKm(
        currentLocation.lat,
        currentLocation.lon,
        targetLocation.lat,
        targetLocation.lon
      );

      if (distance < 0.1) {
        Alert.alert('You are near the target location!');
        setAlertTriggered(true); // Prevent further alerts
      }
    }
  }, [currentLocation, alertTriggered]);

  const leafletMapHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <style>
          #map { height: 100%; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <script>
          var map = L.map('map').setView([${currentLocation ? currentLocation.lat : 37.7749}, ${currentLocation ? currentLocation.lon : -122.4194}], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          var marker = L.marker([${targetLocation.lat}, ${targetLocation.lon}]).addTo(map)
            .bindPopup('Target Location: San Francisco')
            .openPopup();
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {hasLocationPermission ? (
        <WebView 
          style={styles.map} 
          originWhitelist={['*']} 
          source={{ html: leafletMapHTML }} 
        />
      ) : (
        <Text>Waiting for location permission...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default App;
