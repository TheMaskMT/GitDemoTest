import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InfoScreen } from './src/components/info';
import { HomeScreen, HeaderLogo } from './src/components/header';
import { InfoInputScreen } from './src/components/inputinfo';
import { NativeBaseProvider } from 'native-base';
import { FooterMenu } from './src/components/footer';

const Stack = createNativeStackNavigator();

export default function App() {  
  return ( 
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator 
          initialRouteName="HomeTest"
          screenOptions={{
              headerStyle: {
                backgroundColor: '#77A3E6',
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
          <View>
            <FooterMenu></FooterMenu>
          </View>
        </NativeBaseProvider>      
      </NavigationContainer>
    );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  // begin: {
  //   fontSize: 36,
  //   fontFamily: 'timenewroman',
  //   fontWeight: 'bold',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }
});
