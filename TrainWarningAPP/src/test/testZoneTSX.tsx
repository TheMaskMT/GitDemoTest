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
    const newItem2 = new Date(value.year(), value.month(), value.date(), value.hour(), value.minute(), value.second())
    setDatearray(prevItems => [...prevItems, newItem2])
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
                  timetest: new Date((creatAt.seconds+creatAt.nanoseconds/1000000000)*1000),
                  creatAt: creatAt.toDate(),
                  timetest2: creatAt
              })
          })
          setUsers(users)
        
        }
      )
  }, [])

  //Chức năng báo động
  const [alertNow, setAlarmNow] = useState(false)
  useEffect(() => {
    const checkAlarm = setInterval(() => {
        const currentTime = new Date();
        if (alertNow==false) {
          clearInterval(checkAlarm)
        } else
        if (
            currentTime.getHours() === alarmTime.getHours() &&
            currentTime.getMinutes() === alarmTime.getMinutes()
        ) {
            // Matched the set alarm time, show an alert
            alert("Alarm", "It is time!");
            // Stop checking once the alert is shown
            clearInterval(checkAlarm);
        }
        console.log('Giờ phút hiện tại: ' + currentTime.getHours() + ':' + currentTime.getMinutes())
        console.log('Giờ phút báo động: ' + alarmTime.getHours() + ':' + alarmTime.getMinutes())
        console.log('Giờ phút báo động trước: ' + alarmStartTime.getHours() + ':' + alarmStartTime.getMinutes())
    }, 1000); // Check every second
    // Cleanup on component unmount
    return () => clearInterval(checkAlarm);
  }, [alarmTime]);

  const testarray = [
    {
        "id": 1,
        "body": "First Item",
        "severity": 1,
        "status": 0
    },
    {
        "id": 2,
        "body": "Second Item",
        "severity": 2,
        "status": 1
    }
  ]

  const TestArrayRender = () => {
    const arrayneed = testarray.map((hero, id) => 
      <h1 key={id}>{hero.body}</h1>)
    return <Text>{arrayneed}</Text>
  }

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
        <Text>{typeof testarray}</Text>
        <FlatList
          style={{width: '100%', backgroundColor: '#0A5E7B', flex: 1}}
          initialNumToRender={20}
          data={users}
          numColumns={1}
          key={'*'}
          renderItem={({item}) => (
            <View>
              <Text>{item.id}</Text>
              {/* {(typeof item.creatAt == 'undefined' && item.creatAt.second && item.creatAt.nanoseconds)
                ?<Text>Không tồn tại</Text>
                :<Text>{new Date((item.creatAt.seconds+item.creatAt.nanoseconds/1000000000)*1000).toDateString()}</Text>
              } */}
              <Text>{item.time.toString()}</Text>
              {(typeof item.time == 'undefined')
                ?<Text>Không tồn tại</Text>
                :<Text>{}</Text>
              }

              {item.time.map((time, index) => (
                <Text>{time.toDate().toLocaleString()}</Text>
              ))}
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

        <Text>Ngày {value.date()} tháng {value.month()+1} năm {value.year()}, {(value.hour()>9)?value.hour():'0'+value.hour()}:{(value.minute()>9)?value.minute():'0'+value.minute()}</Text>
        <Text>Báo động: {alarmTime.toTimeString()}</Text>
        {/* <Text>Báo động trước: {alarmStartTime.toTimeString()}</Text> */}
        
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