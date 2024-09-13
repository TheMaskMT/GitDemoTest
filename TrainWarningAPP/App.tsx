import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, Provider as PaperProvider, Surface } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { InfoScreen } from './src/InfoSreen';
import { HomeScreen, HeaderLogo } from './src/HeadSrceen';
import { InfoInputScreen } from './src/InputInfoSrceen';
import { NativeBaseProvider } from 'native-base';
import { DownloadMedia } from './src/DownloadMedia';
import { MapScreen } from './src/MapSrceen';
import { TestScreen } from './src/TestScreen';
import EditData  from './src/components/EditData';
import { MapLocation } from './src/components/MapLocation';

const InfoStack = createNativeStackNavigator();

function InfoStackScreen() {
  return (
    <InfoStack.Navigator screenOptions={({}) => ({
      // headerShown: false
    })
    }>
      <InfoStack.Screen name="Info" component={InfoScreen} options={{headerTitle:() => HeaderLogo("Info"), headerStyle: { backgroundColor: '#11113B'}}}/>
      <InfoStack.Screen name="EditInfo" component={EditData} options={{headerTitle:() => HeaderLogo("EditData"), headerStyle: { backgroundColor: '#11113B'}, headerTintColor: '#F8E5CB',}}/>
      {/* <InfoStack.Screen name="MapLocation" component={MapLocation} options={{headerTitle:() => HeaderLogo("MapLocation"), headerStyle: { backgroundColor: '#11113B'}, headerTintColor: '#F8E5CB',}}/> */}
      <InfoStack.Screen name="MapLocation" component={MapLocation} 
        options={{
          headerStyle: { 
            backgroundColor: '#11113B',
          }, 
          headerTintColor: '#F8E5CB', 
          headerTitleStyle: {
            color: '#F8E5CB',
            fontSize: 26, 
            fontWeight: 'bold'
          }
          }}/>
    </InfoStack.Navigator>
  )
}

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#11113B',
    accent: '#0A5E7B',
    surface: '#EFBF7F',
    background: '#EFBF7F',
    text: '#000000',
    placeholder: '#b8b8b8',
    backdrop: ''
  },
};

const Tab = createBottomTabNavigator()

export default function App() {  
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator 
        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size}) => {
            let iconName

            if(route.name === 'Home') {
              iconName = focused ? 'home': 'home-outline'
            }
            else if (route.name === 'InfoStack') {
              iconName = focused ? 'settings' : 'settings-outline'
            } 
            else if (route.name === 'InputInfo') {
              iconName = focused ? 'add-circle' : 'add-circle-outline'
            } 
            else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline'
            }
            else if (route.name === 'Download') {
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
          <Tab.Screen name = "InfoStack" component={InfoStackScreen}
          // options={{headerTitle:() => HeaderLogo("Info"), headerStyle: { backgroundColor: '#11113B'}}}
          options={{headerShown: false}}
          />
          <Tab.Screen name = "InputInfo" component={InfoInputScreen} options={{headerTitle:() => HeaderLogo("InputInfo"), headerStyle: { backgroundColor: '#11113B'}}}/>
          <Tab.Screen name = "Map" component={MapScreen} options={{headerTitle:() => HeaderLogo("TestZone"), headerStyle: { backgroundColor: '#11113B'}}}/>
          <Tab.Screen name = "Download" component={DownloadMedia} options={{headerTitle:() => HeaderLogo("DownloadMedia"), headerStyle: { backgroundColor: '#11113B'}}}/>
          <Tab.Screen name = "TestZone" component={TestScreen} options={{headerTitle:() => HeaderLogo("TestZone"), headerStyle: { backgroundColor: '#11113B'}}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
