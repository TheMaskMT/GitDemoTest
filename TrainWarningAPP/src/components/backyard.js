import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export function sayHello(){
  console.log("Hello, world!");
}

export function sayGoodbye(){
  console.log("Go to hell!");
}

export function BackYardScreen(){
  return(
    <View style={styles.container}>
        <Text>Sân sau nhà ta.</Text>
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