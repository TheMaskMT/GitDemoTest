import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { storeData, getData } from './datastorage';
import Fetch from '../Fetch';


export function InfoScreen({navigation}){
  return(
    <View style={styles.container}>
        <Fetch></Fetch>
        <Pressable onPress = {() => navigation.navigate('InputInfo')}>
          <Text style={styles.button}>Info</Text>
        </Pressable>
    </View>
  );
}

// function saveInfo(navigation){
//   navigation.navigate('Home')
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3465B5',
    padding: 10,
    color: 'white',
    borderRadius: 10,
  }
});