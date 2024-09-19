import * as React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Fetch } from './components/Fetch';
import { IndevelopScreen } from './IndevelopScreen';


export function InfoScreen({navigation}){
  return(
    <View style={styles.container}>
        
        {
        (Platform.OS === 'android') 
        ? IndevelopScreen()
        : <Fetch navigation={navigation}></Fetch>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});