import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import GeoLocation from '@react-native-community/geolocation'
import axios from 'axios';

// const myelement = (
//   <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3917.0747326501346!2d106.82948067451943!3d10.957727455824507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDU3JzI3LjgiTiAxMDbCsDQ5JzU1LjQiRQ!5e0!3m2!1svi!2s!4v1723005448707!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
// );
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(myelement)

export function HeaderLogo()
{
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

  // const {CurrentLocation, setCurrentLocation} = React.useState<import('./AddressModel').AddressModel>

  // useEffect(() => {
  //   GeoLocation.getCurrentPosition(position =>{
  //     if(position.coords){
  //       reverseGeoCode({
  //         lat: position.coords.latitude,
  //         long: position.coords.longitude,
  //       });
  //     }
  //     console.log(position.coords.latitude, position.coords.longitude)
  //   });
  // }, []);
  
  // const reverseGeoCode = async ({lat, long}) => { 
  //   const apiKey = 'f-dbVATubYC578CzxN6hMXJWu5wkgtLyf42CUBaQOSc'
  //   const api = 'https://revgeocode.search.hereapi.com/v1/revgeocode?apikey='+(apiKey)+'&at='+(lat)+','+(long)+'&lang=vi-VI';

  //   try {
  //     const res = await axios.get(api)
  //     if(res && res.status === 200 && res.data)
  //     {
  //       const items = res.data.items
  //       setCurrentLocation(items[0])
  //     }
        
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   // console.log(lat,long)
  // }
  

  return(
    // <View style={styles.container}>
    //     <Text style={{padding: 5, fontSize: 22}}>Nhấn nút để nhập dữ liệu!</Text>
        
    //     <Pressable title='Nhập dữ liệu' onPress = {() => 
    //       {
    //         navigation.navigate('Info')
    //       } 
    //       }>
    //       <Text style={styles.button}>Nhập dữ liệu</Text>  
    //     </Pressable>
    //     <StatusBar style="auto" />
    //   </View>
    <>
    <div>
      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3917.0747326501346!2d106.82948067451943!3d10.957727455824507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDU3JzI3LjgiTiAxMDbCsDQ5JzU1LjQiRQ!5e0!3m2!1svi!2s!4v1723005448707!5m2!1svi!2s" width="600" height="450" style={"border:0;"} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
      </iframe> */}
      Text Test
    </div>
    </>
    
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
    padding: '5px',
    borderColor: 'green',
    color: 'white',
  }
});