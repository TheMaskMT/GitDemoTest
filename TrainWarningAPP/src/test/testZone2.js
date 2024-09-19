import * as Location from 'expo-location';
import { View, Button, Text, Image} from 'react-native'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import LeafletMapView from 'react-native-leaflet-map';

const handleLocationClick = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access location was denied');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  console.log('Location:', location.coords);
};

function WeatherApp() {

  const onLeafletMessageReceivedHandler = () => {
    console.log('onLeafletMessageReceivedHandler had run')
    return (<Text>onLeafletMessageReceivedHandler had run</Text>)
  }

  return (
    <View>
      <Button title='Get Location' onPress={handleLocationClick}></Button>
      {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}

    <View style={{ flex: 1 }}>
      <LeafletMapView
        mapLayers={[
          {
            baseLayer: true,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            minNativeZoom: 11,
            maxNativeZoom: 18,
            minZoom: 11,
            maxZoom: 20,
          },
        ]}
        mapMarkers={[
          {
            id: 'location-marker',
            icon: 'https://cdn-icons-png.flaticon.com/64/2776/2776067.png',
            size: [64, 64],
            iconAnchor: [32, 64],
            position: {
              lat: 1.305587412732045,
              lng: 103.83318545292657,
            },
          },
        ]}
        onMessage={onLeafletMessageReceivedHandler}
        mapCenterPosition={{ lat: 1.358479, lng: 103.815201 }}
      />
    </View>;
    </View>
  );
}

export default WeatherApp;