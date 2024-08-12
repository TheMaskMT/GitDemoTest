import * as React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View, Alert, Button } from 'react-native';
import { storeData, getData } from './datastorage';
import { TextArea } from 'native-base';
import  AddData  from '../AddData'

export function InfoInputScreen({navigation}){
  // const [text, onChangeText] = useState('Useless Text');
  // const [latitude, setLatitude] = useState('')
  // const [longitude, setLongitude] = useState('')
  
  // const [number, onChangeNumber] = React.useState('');
  return(
    <View style={styles.container}>
      {/* <Text style={{padding: 5, fontSize: 22}}>Nhập tên đường</Text>
      <TextInput 
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput style={{padding: 5, fontSize: 22, borderColor: 'black', borderWidth: 2, flex: 1}} placeholder='Lat' onChangeText={setLatitude} value={latitude}></TextInput>
      <TextInput style={{padding: 5, fontSize: 22, borderColor: 'black', borderWidth: 2, flex: 1}} placeholder='Long' onChangeText={setLongitude} value={longitude}></TextInput>
      
      <Pressable onPress = {() => storeData('2', text)}>
      <Text style={styles.button}>Lưu</Text>
      </Pressable>
      <Pressable onPress = {() => getData('2')}>
      <Text style={styles.button}>Đọc</Text>
      </Pressable>
      <Text> Giá trị bạn vừa nhập là: {text}</Text>
       <StatusBar style="auto" /> */}
       <AddData></AddData>
    </View>
  );
}

// function saveInfo(navigation){
//   navigation.navigate('Home')
// }

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