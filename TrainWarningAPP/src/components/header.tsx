import * as React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import GeoLocation from '@react-native-community/geolocation'
//import ReactIframe from 'react-iframe'
import { GoogleMap } from './googlemap';
import { AddressModel } from '../models/AddressModel';
import axios from 'axios';

export function HeaderLogo() {
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
      <Image 
        style={{ width: 50, height: 50 }}
        source={require('../../assets/train-icon-railway-50.png')}
      >
      </Image>
      <Text style={{color: 'white', padding: 5, fontSize: 26, fontWeight: 'bold'}}>Home</Text>
    </View>

  );
}

export function HomeScreen({navigation}){
 
  const [currentLocation, setCurrentLocation] = useState<AddressModel>()
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

   useEffect(() => {
    GeoLocation.getCurrentPosition(position =>{
      if(position.coords)
      {
        reverseGeoCode({
          lat: position.coords.latitude, 
          lng: position.coords.longitude,
        })
      }
    });
  }, []);

  const reverseGeoCode = async ({lat, lng}: {lat: number; lng: number}) =>{
    const api = 'https://revgeocode.search.hereapi.com/v1/revgeocode?at='+lat+','+lng+'&lang=en-US&apiKey=f-dbVATubYC578CzxN6hMXJWu5wkgtLyf42CUBaQOSc'
    
    try {
      const res = await axios(api)

      if(res && res.status === 200 && res.data) {
        const items = res.data.items
        setCurrentLocation(items[0])
      }
    } catch(error){
      console.log(error)
    }
  }
  
  return(
    <View style={styles.container}>
        {currentLocation && (
        <>
          <TextInput style={{padding: 5, fontSize: 22, borderColor: 'black', borderWidth: 2, flex: 1}} placeholder='Lat' onChangeText={setLatitude} value={latitude}></TextInput>
          <TextInput style={{padding: 5, fontSize: 22, borderColor: 'black', borderWidth: 2, flex: 1}} placeholder='Long' onChangeText={setLongitude} value={longitude}></TextInput>
        </>
        )}
        {/* Gọi map ra */}
        {currentLocation && (
          GoogleMap(currentLocation.position.lat, currentLocation.position.lng)
        )}
        <Pressable onPress = {() => navigation.navigate('Info')}>
          <Text style={styles.button}>Info</Text>  
        </Pressable>
        <StatusBar style="auto" />
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkblue',
    padding: 5,
    borderColor: 'green',
    color: 'white',
  }
});