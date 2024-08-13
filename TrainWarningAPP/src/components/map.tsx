import * as React from 'react';
import { useEffect, useState } from 'react';
import GeoLocation from '@react-native-community/geolocation'
import { GoogleMap } from './googlemap';
import { AddressModel } from '../models/AddressModel';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';

export function RefMap () {
    const [currentLocation, setCurrentLocation] = useState<AddressModel>()

    useEffect(() => {
     GeoLocation.getCurrentPosition(position =>{
       if(position.coords)
       {
         reverseGeoCode({
           lat: position.coords.latitude, 
           lng: position.coords.longitude,
         })
         console.log(position.coords.latitude, position.coords.longitude)
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

   return (
    <>
        {/* Gọi map ra */}
        {currentLocation && (
            GoogleMap(currentLocation.position.lat, currentLocation.position.lng)
        )}
    </>
   )
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