import React, { useState } from 'react';
import { Button, View, Text, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

function WeatherApp() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  const proceed = () => {
    alert('Đang sử dụng vị trí');
  };

  const handleLocationClick = async () => {
    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Yêu cầu vị trí',
          message: 'Ứng dụng này cần sử dụng vị trí của bạn',
          buttonPositive: 'Đồng ý',
          buttonNegative: 'Từ chối',
          buttonNeutral: 'Hỏi lại sau'
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted
        proceed();
        console.log('Đã có quyền truy cập, android')
      } else {
        // Permission Denied
        alert('Quyền truy cập vị trí bị từ chối');
      }
    } else {
      proceed();
      console.log('Quyền truy cập bình thường.');
    }

    if (Geolocation) {
      Geolocation.getCurrentPosition(success, error);
    } else {
      // console.log("Geolocation not supported");
      console.log("Không hỗ trợ vị trí");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <View>
      {!location ? <Button title='Get Location' onPress={handleLocationClick}></Button> : null}
      {location && location != null ? (
        <View>
          <Text>Location: {location.latitude}: {location.longitude}</Text>
        </View>
      ) : <Text>Chưa có vị trí</Text>}
    </View>
  );
}

export default WeatherApp;