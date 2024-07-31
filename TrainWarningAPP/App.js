import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.begin}>This is the begin.</Text>
      <Text>This is the begin.</Text>
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

  begin: {
    fontSize: 36,
    fontFamily: 'timenewroman',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
