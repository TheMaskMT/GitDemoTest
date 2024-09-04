import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView, Alert } from 'react-native';
import { RefMap } from './components/map';
import { View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import alert from './components/alert';
import testzone from './components/testZone';
import TestZoneTSX from './components/testZoneTSX';

export function TestScreen(){
  return (
    <SafeAreaView style={styles.container}>
      {/* {testzone()} */}
      {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Text>TestScreen</Text>
      </View> */}
      {testzone()}
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});