import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InfoScreen } from './src/components/info';
import { HomeScreen, sayGoodbye, HeaderLogo } from './src/components/header';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home"
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


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   begin: {
//     fontSize: 36,
//     fontFamily: 'timenewroman',
//     fontWeight: 'bold',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });
