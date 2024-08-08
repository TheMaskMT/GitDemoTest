import * as React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import GeoLocation from '@react-native-community/geolocation'
//import ReactIframe from 'react-iframe'
//import { Map, MapReal } from './map';
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
// Mở khi đã Billing API
// type Poi ={ key: string, location: google.maps.LatLngLiteral }
// const locations: Poi[] = [
//   {key: 'operaHouse', location: { lat: 10.963286, lng: 106.854736  }},
//   {key: 'tarongaZoo', location: { lat: -33.8472767, lng: 151.2188164 }},
//   {key: 'manlyBeach', location: { lat: -33.8209738, lng: 151.2563253 }},
//   {key: 'hyderPark', location: { lat: -33.8690081, lng: 151.2052393 }},
//   {key: 'theRocks', location: { lat: -33.8587568, lng: 151.2058246 }},
//   {key: 'circularQuay', location: { lat: -33.858761, lng: 151.2055688 }},
//   {key: 'harbourBridge', location: { lat: -33.852228, lng: 151.2038374 }},
//   {key: 'kingsCross', location: { lat: -33.8737375, lng: 151.222569 }},
//   {key: 'botanicGardens', location: { lat: -33.864167, lng: 151.216387 }},
//   {key: 'museumOfSydney', location: { lat: -33.8636005, lng: 151.2092542 }},
//   {key: 'maritimeMuseum', location: { lat: -33.869395, lng: 151.198648 }},
//   {key: 'kingStreetWharf', location: { lat: -33.8665445, lng: 151.1989808 }},
//   {key: 'aquarium', location: { lat: -33.869627, lng: 151.202146 }},
//   {key: 'darlingHarbour', location: { lat: -33.87488, lng: 151.1987113 }},
//   {key: 'barangaroo', location: { lat: - 33.8605523, lng: 151.1972205 }},
// ];



export function HomeScreen({navigation}){
 
  const [currentLocation, setCurrentLocation] = useState<AddressModel>()
  
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
        <Text style={{padding: 5, fontSize: 22}}>Nhấn nút để nhập dữ liệu!</Text>
        {/* Gọi map ra */}
        {currentLocation && (
          GoogleMap(currentLocation.position.lat, currentLocation.position.lng)
        )}
        <Pressable onPress = {() => navigation.navigate('Info')}>
          <Text style={styles.button}></Text>  
        </Pressable>
        <StatusBar style="auto" />
      </View>
  );
}

// Mở khi đã Billing
// const PoiMarkers = (props: {pois: Poi[]}) => {
//   return (
//     <>
//       {props.pois.map( (poi: Poi) => (
//         <AdvancedMarker
//           key={poi.key}
//           position={poi.location}>
//         <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
//         </AdvancedMarker>
//       ))}
//     </>
//   );
// };

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