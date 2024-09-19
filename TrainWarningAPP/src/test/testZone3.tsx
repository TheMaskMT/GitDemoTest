import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const LeafletMap = () => {
  const leafletMapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Leaflet Map</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xwE/8D8m9JUnB+ZT+ZnO7Ye7pihzvcXZK5xa6yoBSm7jv6w3kE/DhD5v1Q1X9Zt+sSniwuepT9wjB2VpzMSeZw=="
        crossorigin=""/>
      <style>
        body, html, #map {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
        }
        #map { height: 100vh; width: 100vw; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-d9bwzK6HH5/JXyqMOiq+WfM7vxMFMq6Jx4BWxJ6PxbeGCZV0GTqGVpGKCjd1nmY2zFDMji2tBIfl9GAJ3GltmQ=="
        crossorigin=""></script>
      <script>
        var map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
      </script>
      <div>Đang chạy 2</div>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: leafletMapHtml }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default LeafletMap;
