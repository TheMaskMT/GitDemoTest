import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { useState } from 'react';

export function TestScreen({navigation}){
//   let animation = true
const [animation, setAnimation] = useState(false)
  return(
    <SafeAreaView style={styles.container}>       
        {/* <Progress.Bar progress={0.3} width={200} />
        <Progress.Pie progress={0.4} size={50} />
        <Progress.Circle size={30} indeterminate={true} /> */}
        <Progress.CircleSnail animating={animation} hidesWhenStopped= {true} color={['red', 'green', 'blue']} />

        <TouchableOpacity onPress={()=> {
            if(animation == true) {
                setAnimation(false)
                console.log(animation)
            }
            else {
                setAnimation(true)
                console.log(animation)
            }
        }}>
            <Text>Bật/tắt</Text>
        </TouchableOpacity>
    </SafeAreaView>
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