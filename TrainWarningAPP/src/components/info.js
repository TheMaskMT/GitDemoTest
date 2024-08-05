import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';



export function InfoScreen(){
  const [text, onChangeText] = React.useState('Useless Text');
  // const [number, onChangeNumber] = React.useState('');
  return(
    <View style={styles.container}>
      <Text style={{padding: 5, fontSize: 22}}>Nơi nhập dữ liệu.</Text>
      <TextInput style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <br/>
      <Button title='Lưu' onPress = {() => navigation.navigate('Home')}/>
      <Text> Giá trị bạn vừa nhập là: {text}</Text>
       <StatusBar style="auto" />
    </View>
  );
}

// function saveInfo() {
//   navigation.navigate('Home')
//   //TextInputValue = document.getElementsByName('TextValue').value
//   //console.log(TextInputValue)
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
});