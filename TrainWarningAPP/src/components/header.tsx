import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
// import { RefMap } from './map';

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

export function HomeScreen({navigation}){
   return(
    <View style={styles.container}>
        {/* <RefMap/> */}
        <ScrollView>
          <Pressable onPress = {() => navigation.navigate('Info')}>
            <Text style={styles.button}>Info</Text>
          </Pressable>
          <Pressable onPress = {() => navigation.navigate('InputInfo')}>
            <Text style={styles.button}>InputInfo</Text>
          </Pressable>
          <StatusBar style="auto" />
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3465B5',
    padding: 10,
    color: 'white',
    borderRadius: 15,
    margin: 10,
  }
});