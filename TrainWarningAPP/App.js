import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InfoScreen } from './src/components/info';
import { HomeScreen, HeaderLogo } from './src/components/header';

// import './App.css'
// import Map from './src/components/map'

const Stack = createNativeStackNavigator();


// function App() {
//   const key = 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8'

//   return (
//     <div className="App">
//           <header>
//             Map Demo
//           </header>
//           <div>
            
//           </div>
//           {/* <Map 
//             googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
//             loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
//             containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
//             mapElement={<div style={{ height: `100%` }} />}
//           /> */}
//     </div>
//   );
// }

// export default App;

export default function App() {  
  return ( 
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="HomeTest"
      screenOptions={{
          headerStyle: {
            backgroundColor: 'orange',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name = "Home" component={HomeScreen} options={{headerTitle:()=><HeaderLogo></HeaderLogo>}}></Stack.Screen>
        <Stack.Screen name = "Info" component={InfoScreen}></Stack.Screen>
      </Stack.Navigator>      
    </NavigationContainer>
  );
}


// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },

// //   begin: {
// //     fontSize: 36,
// //     fontFamily: 'timenewroman',
// //     fontWeight: 'bold',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   }
// // });
