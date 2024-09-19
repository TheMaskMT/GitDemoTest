import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { RefMap } from './map';

export function MapLocation({route, navigation}){
  const {name, lat, log} = route.params
  navigation.setOptions({title: 'Update: ' + name})

  return(
    <SafeAreaView style={styles.container}>
       {RefMap(lat, log)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});