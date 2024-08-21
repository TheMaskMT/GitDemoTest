import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { InfoScreen } from './src/InfoSreen';
import { HomeScreen, HeaderLogo } from './src/HeadSrceen';
import { InfoInputScreen } from './src/InputInfoSrceen';
import { NativeBaseProvider } from 'native-base';
import { DownloadMedia } from './src/DownloadMedia';
import { TestScreen } from './src/TestScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

export default function App() {  
  return ( 
      // <NavigationContainer>
      //   <NativeBaseProvider>
      //     <Stack.Navigator 
      //     initialRouteName="HomeTest"
      //     screenOptions={{
      //         headerStyle: {
      //           backgroundColor: '#77A3E6',
      //         },
      //         headerTintColor: 'white',
      //         headerTitleStyle: {
      //           fontWeight: 'bold',
      //         },
      //       }}>
      //       <Stack.Screen name = "Home" component={HomeScreen} options={{headerTitle:()=><HeaderLogo></HeaderLogo>}}></Stack.Screen>
      //       <Stack.Screen name = "Info" component={InfoScreen}></Stack.Screen>
      //       <Stack.Screen name = "InputInfo" component={InfoInputScreen}></Stack.Screen>
            
      //     </Stack.Navigator>
      //     <View>
      //       <FooterMenu></FooterMenu>
      //     </View>
      //   </NativeBaseProvider>      
      // </NavigationContainer>

      <NavigationContainer>
        <Tab.Navigator 
        
        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size}) => {
            let iconName

            if(route.name === 'Home') {
              iconName = focused ? 'home': 'home-outline'
            }
            else if (route.name === 'Info') {
              iconName = focused ? 'settings' : 'settings-outline'
            } 
            else if (route.name === 'InputInfo') {
              iconName = focused ? 'add-circle' : 'add-circle-outline'
            } 
            else if (route.name === 'DownloadMedia') {
              iconName = focused ? 'download' : 'download-outline'
            }
            else if (route.name === 'TestZone') {
              iconName = focused ? 'bulb' : 'bulb-outline'
            }

            return (
              <Ionicons name={iconName} size={size} color={color} />
            )
          },
          tabBarBadgeStyle: {backgroundColor: ''},
          tabBarActiveBackgroundColor: '#EB0230',
          tabBarInactiveBackgroundColor: '#0A5E7B',
          tabBarInactiveTintColor: '#F8E5CB',
          tabBarActiveTintColor: '#EFBF7F',
          tabBarIconStyle: {justifyContent: 'center', alignItems: 'center'},
          tabBarLabelStyle: { fontSize: 14, justifyContent: 'center', alignItems: 'center'},
          tabBarItemStyle: { borderLeftWidth: 0, borderRightWidth: 1, borderColor: '#F8E5CB'}
        })}
        >
        <Tab.Screen name = "Home" component={HomeScreen} options={{headerTitle:() => HeaderLogo("Home"), headerStyle: { backgroundColor: '#11113B'}}}/>
        <Tab.Screen name = "Info" component={InfoScreen} options={{headerTitle:() => HeaderLogo("Info"), headerStyle: { backgroundColor: '#11113B'}}}/>
        <Tab.Screen name = "InputInfo" component={InfoInputScreen} options={{headerTitle:() => HeaderLogo("InputInfo"), headerStyle: { backgroundColor: '#11113B'}}}/>
        <Tab.Screen name = "DownloadMedia" component={DownloadMedia} options={{headerTitle:() => HeaderLogo("DownloadMedia"), headerStyle: { backgroundColor: '#11113B'}}}/>
        <Tab.Screen name = "TestZone" component={TestScreen} options={{headerTitle:() => HeaderLogo("TestZone"), headerStyle: { backgroundColor: '#11113B'}}}/>

        </Tab.Navigator>
      </NavigationContainer>
    );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red',
    // // alignItems: 'center',
    // // justifyContent: 'center',
  },
});
