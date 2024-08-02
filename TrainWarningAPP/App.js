import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BackYardScreen } from './src/components/backyard';
import { HomeScreen, sayGoodbye } from './src/components/header';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component={HomeScreen}></Stack.Screen>
      </Stack.Navigator>      
    </NavigationContainer>
  );
}

sayGoodbye();

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
