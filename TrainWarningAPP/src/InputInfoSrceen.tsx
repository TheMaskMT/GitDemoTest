import * as React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import  AddData  from './components/AddData'
import { SafeAreaView } from 'react-native-safe-area-context';
import { IndevelopScreen } from './IndevelopScreen';

export function InfoInputScreen({navigation}){

  return(
    <SafeAreaView style={styles.container}>
        {/* {
          (Platform.OS === 'android') 
          ? IndevelopScreen()
          : <AddData></AddData>
        } */}
        <AddData></AddData>
    </SafeAreaView>
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