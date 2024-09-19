import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView, Alert, Platform } from 'react-native';
import { RefMap } from './components/map';
import { View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import alert from './components/alert';
import TestZone from './test/testZone';
import TestZone2 from './test/testZone2';
import TestZone3 from './test/testZone3';
// import LeafletMap from './test/testZone4';
import TestZoneTSX from './test/testZoneTSX';
import useStateTest from './test/useStateExample'
import useMapTest from './test/testUseSelect'
import test from './test/test'
import { IndevelopScreen } from './IndevelopScreen';
import { LeafletMap } from './test/testMAP'
import { useEffect, useState } from 'react';
import { firebase } from '../config';

export function TestScreen(){
  const [users, setUsers] = useState([])
  const placeRef = firebase.firestore().collection('place').orderBy('name')

  useEffect(() => {
    // Trả về thuộc tính vào mảng users
    placeRef
    .onSnapshot(
      querySnapshot => {
        const users = []
        querySnapshot.forEach((doc) => {
          const { name, details, img, lat, log} = doc.data()
          users.push({
            id: doc.id,
            name,
            details,
            img,
            lat,
            log
          })       
        })
        setUsers(users)
      }
    )
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      {
        (Platform.OS === 'android') 
        ? IndevelopScreen()
        : LeafletMap(10, 106, users, true)
      }


      {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Text>TestScreen</Text>
      </View> */}
      {/* {TestZoneTSX()} */}
      {/* {useMapTest()} */}
      {/* {LeafletMap(10, 106, users, true)} */}


      {/* {useStateTest()}
      <Text>Ê1</Text> */}
      {/* {test()} */}
      {/* {useStateTest()} */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});