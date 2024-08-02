import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

export function sayHello(){
  console.log("Hello, world!");
}

export function sayGoodbye(){
  console.log("Go to hell!");
}

export function HeaderLogo()
{
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
      <Image 
        style={{ width: 50, height: 50 }}
        source={require('../../assets/train-icon-railway-50.png')}
      >
      </Image>
      <Text style={{color: 'white', padding: 5, fontSize: 26, fontWeight: 'bold'}}>Home</Text>
    </View>

  );
}

export function HomeScreen({navigation}){
  return(
    <View style={styles.container}>
        <Text style={{padding: 5, fontSize: 22}}>Nhấn nút để nhập dữ liệu!</Text>
        <br/>
        <Button title='Nhập dữ liệu' onPress = {() => navigation.navigate('Info')}/>
        <StatusBar style="auto" />
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
});