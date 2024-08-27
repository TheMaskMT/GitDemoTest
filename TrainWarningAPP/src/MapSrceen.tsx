import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { RefMap } from './components/map';
import { View } from 'native-base';

export function MapScreen({navigation}){

  return(
    <SafeAreaView style={styles.container}>
      {RefMap()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});