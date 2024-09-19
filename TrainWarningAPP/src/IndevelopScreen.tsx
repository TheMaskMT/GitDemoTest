import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView, Alert, Platform } from 'react-native';

export function IndevelopScreen(){
  return (
    <SafeAreaView style={styles.container}>
      <Text>Đang trong quá trình phát triển</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});