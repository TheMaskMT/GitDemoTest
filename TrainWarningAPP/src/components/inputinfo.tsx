import * as React from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet, View, } from 'react-native';
import  AddData  from '../AddData'
import UploadMediaFile from '../UploadMediaFile';

export function InfoInputScreen({navigation}){
  // const [text, onChangeText] = useState('Useless Text');
  // const [latitude, setLatitude] = useState('')
  // const [longitude, setLongitude] = useState('')
  
  // const [number, onChangeNumber] = React.useState('');
  return(
    <View style={styles.container}>
       {/* <AddData></AddData> */}
      <UploadMediaFile></UploadMediaFile>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkblue',
    padding: 10,
    color: 'white',
    // borderRadius: '10px'
  }
});