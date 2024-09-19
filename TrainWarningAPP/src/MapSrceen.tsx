import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import { RefMap } from './components/map';
import { View } from 'native-base';
import { IndevelopScreen } from './IndevelopScreen';

export function MapScreen({navigation}){
  return(
    <SafeAreaView style={styles.container}>
      {
        (Platform.OS === 'android') 
        ? IndevelopScreen()
        : RefMap()
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});