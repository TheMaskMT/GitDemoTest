import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { storeData, getData } from './datastorage';


export function InfoScreen({navigation}){
  const [text, onChangeText] = React.useState('Useless Text');
  // const [number, onChangeNumber] = React.useState('');
  return(
    <View style={styles.container}>
      <Text style={{padding: 5, fontSize: 22}}>Nơi nhập dữ liệu.</Text>
      <TextInput 
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
   
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