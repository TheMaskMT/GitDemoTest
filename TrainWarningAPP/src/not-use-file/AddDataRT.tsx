import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, {useState} from 'react'
import { db } from '../../config'
import { ref, set, } from 'firebase/database'
import { TextInput } from 'react-native-paper'


const AddDataRT = () => {
const [name, setName] = useState('')
const [details, setDetails] = useState('')

const dataAddOn = () => {
    set(ref(db, 'place/'), {
        name: name,
        details: details,
    })
    setName('')
    setDetails('')
}

    return (
        <View style={styles.container}>
            <Text style = {styles.header}>Add Data</Text>
            <TextInput
                placeholder='Name'
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
            />
            <TextInput
                placeholder='Details'
                value={details}
                onChangeText={(text) => setDetails(text)}
                style={styles.input}
            />
            <Pressable onPress={dataAddOn}>
                <Text>Submit</Text>
            </Pressable>
        </View>
    )
}

export default AddDataRT

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
    }
})