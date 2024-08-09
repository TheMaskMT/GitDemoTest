import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View, Alert, Button } from 'react-native';
import { storeData, getData } from './datastorage';


export function InfoInputScreen({navigation}){
  const [text, onChangeText] = React.useState('Useless Text');

  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  
  // const [number, onChangeNumber] = React.useState('');
  return(
    <View style={styles.container}>
      <Text style={{padding: 5, fontSize: 22}}>Nơi nhập dữ liệu.</Text>
      <TextInput 
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />

    <Button title={'2-Button Alert'} onPress={createTwoButtonAlert} />
    <Button title={'3-Button Alert'} onPress={createThreeButtonAlert} />
      <Pressable onPress = {() => storeData('2', text)}>
      <Text style={styles.button}>Lưu</Text>
      </Pressable>
      <Pressable onPress = {() => getData('2')}>
      <Text style={styles.button}>Đọc</Text>
      </Pressable>
      <Text> Giá trị bạn vừa nhập là: {text}</Text>
       <StatusBar style="auto" />
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