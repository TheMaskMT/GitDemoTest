import { View, Text, StyleSheet, Pressable, TextInput, Keyboard} from 'react-native'
import React, {useState} from 'react'
import { firebase } from '../config'
import { err } from 'react-native-svg';

const AddData = () => {
    const placeRef = firebase.firestore().collection('place')
    const [addName, setAddName] = useState('')
    const [addDetails, setAddDetails] = useState('')
    const [addImage, setAddImage] = useState('')
    


    // add new field
    const addField = () => {
        if (addName && addName.length > 0 && addDetails && addDetails.length > 0 && addImage && addImage.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp()
            const data = {
                name: addName,
                createAt: timestamp,
                details: addDetails,
                img: addImage,
            }
            placeRef
                .add(data)
                .then(() => {
                    setAddName('')
                    setAddDetails('')
                    setAddImage('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }   


    return (
        <View style={styles.container}>
            <Text style = {styles.header}>Add Data</Text>
            <TextInput
                style={styles.input}
                placeholder='Name'
                placeholderTextColor={'#aaaaa'}
                onChangeText={(name) => setAddName(name)}
                value={addName}
                multiline={false}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
            />
             <TextInput
                style={styles.input}
                placeholder='Details'
                placeholderTextColor={'#aaaaa'}
                onChangeText={(details) => setAddDetails(details)}
                value={addDetails}
                multiline={true}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
            />
             <TextInput
                style={styles.input}
                placeholder='Details'
                placeholderTextColor={'#aaaaa'}
                onChangeText={(details) => setAddDetails(details)}
                value={addDetails}
                multiline={true}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
            />
            
            <Pressable style={styles.button} onPress={addField}>
                <Text>Submit</Text>
            </Pressable>
        </View>
    )
}

export default AddData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
})