import * as React from 'react';
import { StyleSheet } from 'react-native';
import  AddData  from './components/AddData'
import { SafeAreaView } from 'react-native-safe-area-context';


export function InfoInputScreen({navigation}){

  return(
    <SafeAreaView style={styles.container}>
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