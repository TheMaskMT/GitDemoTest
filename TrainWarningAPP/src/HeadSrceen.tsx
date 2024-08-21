import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
// import { RefMap } from './map';

const image = {uri: '../../assets/ve-tau-doi-tra.jpg'}


export function HeaderLogo(text: string) {
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
      
      {( text == 'Home' ) 
        ? 
        // <Image 
        // style={{ width: 50, height: 50 }}
        // source={require('../assets/train-icon-railway-50.png')}>
        // </Image>
        <Ionicons name= 'train' size={40} color={'#F8E5CB'}></Ionicons>
        : <></>
      }
      <Text style={{color: '#F8E5CB', padding: 5, fontSize: 26, fontWeight: 'bold'}}>{text}</Text>
    </View>
  );
}


export function HomeScreen({navigation}){
   return(
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode='cover' style={styles.image}> 
        {/* <RefMap/> */}
          <ScrollView>
            <Pressable onPress = {() => navigation.navigate('Info')}>
              <Text style={styles.button}>Info</Text>
            </Pressable>
            <Pressable onPress = {() => navigation.navigate('InputInfo')}>
              <Text style={styles.button}>InputInfo</Text>
            </Pressable>
            {/* <StatusBar style="auto" /> */}
          </ScrollView>
          </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 12
  },
  image: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A5B77',
    padding: 10,
    color: '#EFBF7F',
    borderRadius: 15,
    margin: 10,
    textAlign: 'center',
    // minWidth: 86,
    // width: '60%',
    // display: 'flex'
  }
});