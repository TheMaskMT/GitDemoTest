import * as React from 'react';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import GeoLocation from '@react-native-community/geolocation'
//import ReactIframe from 'react-iframe'
import { Iframe } from '@bounceapp/iframe'

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
  useEffect(() => {
    GeoLocation.getCurrentPosition(position =>{
      console.log(position);
    });
  }, []);
  
  return(
    <View style={styles.container}>
        <Text style={{padding: 5, fontSize: 22}}>Nhấn nút để nhập dữ liệu!</Text>
        {/* <ReactIframe 
          url='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15668.880921940221!2d106.8060391!3d10.94672995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1723017396800!5m2!1svi!2s'
          width='600px'
          height='450px'
        /> */}
        <Iframe 
        //uri='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15668.880921940221!2d106.8060391!3d10.94672995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1723017396800!5m2!1svi!2s' 
        uri='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=10.953563,%20106.799445+(My%20Place)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
        //src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15668.973417643556!2d106.87243145438883!3d10.944981114564161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174de7f754a8663%3A0x23f79485b6ab37c4!2zQuG7h25oIFZp4buHbiDEkGEgS2hvYSDEkOG7k25nIE5haQ!5e0!3m2!1svi!2s!4v1723019420638!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        style={{ width: '100%', height: '100%'}}
        />
        
        <Pressable title='Nhập dữ liệu' onPress = {() => navigation.navigate('Info')}>
          <Text style={styles.button}>Nhập dữ liệu</Text>  
        </Pressable>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkblue',
    padding: '5px',
    borderColor: 'green',
    color: 'white',
  }
});