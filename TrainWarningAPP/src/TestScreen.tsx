import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView, Alert } from 'react-native';
import { RefMap } from './components/map';
import { View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import alert from './components/alert';
import TestZone from './test/testZone';
import TestZoneTSX from './test/testZoneTSX';
import useStateTest from './test/useStateExample'
import test from './test/test'

export function TestScreen(){
  return (
    <SafeAreaView style={styles.container}>
      {/* {testzone()} */}
      {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Text>TestScreen</Text>
      </View> */}
      {test()}
      {/* {useStateTest()} */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});