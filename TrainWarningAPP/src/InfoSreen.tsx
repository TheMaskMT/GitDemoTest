import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fetch } from './components/Fetch';


export function InfoScreen({navigation}){
  return(
    <View style={styles.container}>
        <Fetch></Fetch>
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