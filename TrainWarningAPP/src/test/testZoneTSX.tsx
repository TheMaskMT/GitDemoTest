import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextInput, Button } from 'react-native-paper'
import { firebase } from '../../config'
import alert from '../components/alert';
import { ref } from 'firebase/storage'

export default function BasicDateTimePicker() {
  const timestamptestRef = firebase.firestore().collection('timestamptest')
  const placeRef = firebase.firestore().collection('place')
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date().toISOString()))
  const [datearray, setDatearray] = useState([])
  const [users, setUsers] = useState([])

  //Upload dữ liệu cho FireBase
  const addDatetoFireBase = (time) => {
    if(time)
    {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
      const data = {
        time,
        creatAt: timestamp
      }
      timestamptestRef
        .add(data)
        .then(()=>{
          alert('Đã upload xong!!!')
        })
    }
    else {
      console.log('Không thể lưu dữ liệu đã nhập!!!')
      alert('Lỗi', 'Không thể lưu dữ liệu đã nhập!!!')
    }
  }

  const save = () => {
    addDatetoFireBase(datearray)
  }

  const adddate = () => {
    const newItem = value.toDate()
    setDatearray(prevItems => [...prevItems, newItem])
  }

  const [alarmTime, setAlarmTime] = useState(new Date())
  const [alarmStartTime, setAlarmStartTime] = useState(new Date())

  //Fetch dữ liệu
  useEffect(() => {
    timestamptestRef
      .orderBy('creatAt')
      .onSnapshot(
        querySnapshot => {
          const users = []
          querySnapshot.forEach((doc) => {
              const { time, creatAt } = doc.data()
              users.push({
                  id: doc.id,
                  time,
                  creatAt: creatAt.toDate(),
              })
          })
          setUsers(users)
          console.log('Đã nạp dữ liệu')
        }
      )
  }, [])

  //Chức năng báo động
  // const [alertNow, setAlertNow] = useState(false)
  // useEffect(() => {
  //   const checkAlarm = setInterval(() => {
  //       const currentTime = new Date();
  //       if (alertNow==false) {
  //         clearInterval(checkAlarm)
  //       } else
  //       if (
  //           currentTime.getHours() === alarmTime.getHours() &&
  //           currentTime.getMinutes() === alarmTime.getMinutes()
  //       ) {
  //           // Matched the set alarm time, show an alert
  //           alert("Alarm", "It is time!");
  //           // Stop checking once the alert is shown
  //           clearInterval(checkAlarm);
  //       }
  //       console.log('Giờ phút hiện tại: ' + currentTime.getHours() + ':' + currentTime.getMinutes())
  //       console.log('Giờ phút báo động: ' + alarmTime.getHours() + ':' + alarmTime.getMinutes())
  //       console.log('Giờ phút báo động trước: ' + alarmStartTime.getHours() + ':' + alarmStartTime.getMinutes())
  //   }, 1000); // Check every second


  //   // Cleanup on component unmount
  //   return () => clearInterval(checkAlarm);

  // }, [alarmTime]);

  //Báo động mảng
  const [isTime, setIsTime] = useState(false)
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    console.log('Báo động mảng đã chạy')
    users.forEach((times, index) => {
      const {creatAt, time} = times
      console.log(creatAt, time.toString())
      time.forEach((timestamp, index) => {
        const delay = timestamp.toDate() - Date.now()
        if(delay > 0) {
          const checkAlarms = setTimeout(() => {
            setIsTime(true)
            setAlerts((prev) => [...prev, new Date(timestamp).toLocaleTimeString()]); // Store alert
            console.log('Đã set up Alerts. Thời điểm báo động là: ' + timestamp.toDate().toLocaleString())
          }, delay)
          console.log('delay > 0')
          // Cleanup on component unmount
          return () => clearTimeout(checkAlarms);
        }
      });
    })
  }, [users]);

  //Tính khoảng cách
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [targetLocation, setTargetLocation] = useState({ lat: lat, lon: lon }); // Example: San Francisco

  useEffect(() => {
    setTargetLocation({lat, lon})
  }, [lat, lon])

  const [currentLocation, setCurrentLocation] = useState(null);
  const [alertTriggered, setAlertTriggered] = useState(false);

  useEffect(() => {
      // Watch the user's current location
      const geoId = navigator.geolocation.watchPosition(
          (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ lat: latitude, lon: longitude });
          },
          (error) => {
              console.error('Error getting location', error);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      // Cleanup function to stop watching location when component unmounts
      return () => navigator.geolocation.clearWatch(geoId);
  }, []);

  const [distance, setDistance] = useState(Number)

  useEffect(() => {
    // When the current location changes, check the distance to the target location
    if (currentLocation && !alertTriggered) {
      const distance = getDistanceFromLatLonInKm(
          currentLocation.lat,
          currentLocation.lon,
          targetLocation.lat,
          targetLocation.lon
      );
      setDistance(distance)

      // Check if the distance is within the threshold (e.g., 100 meters or 0.1 km)
      if (distance < 0.1 && isTime) {
          alert("You are near the target location and it's time!");
          setAlertTriggered(true); // Prevent further alerts
      }
    }

  }, [currentLocation, alertTriggered, targetLocation, isTime]);

  return (
    <View style={styles.container}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs} 
        adapterLocale='vi'
        // localeText={viVN.components.MuiLocalizationProvider.defaultProps.localeText}
        >
          <br></br>
          <DateTimePicker
            format='DD-MM-YYYY HH:mm'
            ampm={false}
            timeSteps={{hours: 1, minutes: 1}}
            label="Chọn giờ chạy"
            value={value}
            onChange={(value) => {
              // setAlarmTime(new Date(value.year(), value.month(), value.date(), value.hour(), value.minute(), value.second()))
              // setAlarmNow(true)
              setValue(value)
              // console.log(value)
            }}
          />
        
        <FlatList
          style={{width: '100%', backgroundColor: '#0A5E7B', flex: 1}}
          initialNumToRender={20}
          data={users}
          numColumns={1}
          key={'*'}
          renderItem={({item}) => (
            <View>
              <Text>{item.id}</Text>
              {(typeof item.creatAt == 'undefined' && item.creatAt.second && item.creatAt.nanoseconds)
                ?<Text>Không tồn tại</Text>
                :<Text>Ngày tạo: {item.creatAt.toLocaleString()}</Text>
              }
              {/* <Text>{item.time.toString()}</Text> */}

              {(typeof item.time == 'undefined')
                ?<Text>Không tồn tại</Text>
                : item.time.map((time, index) => (
                  <Text>Ngày {index + 1}: {time.toDate().toLocaleString()}</Text>
                ))
              }

              {/* {item.time.map((time, id) => <Text>{time.seconds}</Text>)} */}
              <br></br>
            </View>
          )}
        />

        <FlatList
          style={{width: '100%', backgroundColor: '#F8E5CB', flex: 1}}
          initialNumToRender={20}
          data={datearray}
          numColumns={1}
          key={'^'}
          renderItem={({item}) => (
            <View>
              {/* <Text>{item.id}</Text>
              <Text>{item.name}</Text> */}
              {/* {(typeof item.creatAt == 'undefined')
                ?<Text>Không tồn tại</Text>
                :<Text>{new Date((item.creatAt.seconds+item.creatAt.nanoseconds/1000000000)*1000).toDateString()}</Text>
              } */}
              <Text>Ngày {item.getDate()} tháng {item.getMonth()+1} năm {item.getFullYear()}, {(item.getHours()>9)?item.getHours():'0'+item.getHours()}:{(item.getMinutes()>9)?item.getMinutes():'0'+item.getMinutes()}</Text>
              <br></br>
            </View>
          )}
        />
        <Text>Báo động vị trí</Text>
        <Text>
          Vị trí hiện tại của bạn là:
          {currentLocation 
                    ? ` Latitude: ${currentLocation.lat}, Longitude: ${currentLocation.lon}` 
                    : ' Getting location...'}
        </Text>
        <TextInput
          label='lat'
          placeholder='lat'
          placeholderTextColor={'#B8B8B8'}
          onChangeText={(lat) => setLat(lat)}
          value={String(lat)}
        />

        <TextInput
          label='lon'
          placeholder='lon'
          placeholderTextColor={'#B8B8B8'}
          onChangeText={(lon) => setLon(lon)}
          value={String(lon)}
        />
        <Text>Target location: Latitude: {targetLocation.lat}, Longitude: {targetLocation.lon}</Text>
        <Text>Khoảng cách giữa bạn và điểm đến là: {distance.toFixed(2)} km</Text>
        {!alertTriggered && <p>Bạn đang không ở gần điểm đến.</p>}
        {alertTriggered && <p>Báo động! Bạn đang ở gần điểm đến!</p>}
        <Button onPress={adddate}>Thêm</Button>
        <Button onPress={save}>Lưu</Button>
      </LocalizationProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});