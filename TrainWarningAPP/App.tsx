import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InfoScreen } from './src/components/info';
import { HomeScreen, HeaderLogo } from './src/components/header';
import { InfoInputScreen } from './src/components/inputinfo';
import { NativeBaseProvider, Box, Text, extendTheme } from 'native-base';

const Stack = createNativeStackNavigator();

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};
const theme = extendTheme({colors: newColorTheme})

export default function App() {  
  return ( 
    // <NativeBaseProvider theme={theme}>
    //   <Box flex={1} bg="#b3bef6" alignItems="center" justifyContent="center">
    //     <Text>HelloWorld!</Text>
    //   </Box>
    // </NativeBaseProvider>
      <NavigationContainer>
        <NativeBaseProvider>
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
            <Stack.Screen name = "InputInfo" component={InfoInputScreen}></Stack.Screen>
          </Stack.Navigator>
        </NativeBaseProvider>      
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
