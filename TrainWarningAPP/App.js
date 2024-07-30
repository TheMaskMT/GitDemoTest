import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
<<<<<<< Updated upstream
      <Text>Open up App.js tstart working on your app!</Text>
=======
      <Text style={styles.begin}>This is the begin.</Text>
>>>>>>> Stashed changes
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontSize: 200,
    justifyContent: 'center',
  },

  begin: {
    
  }
});
