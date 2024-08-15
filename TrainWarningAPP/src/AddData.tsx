import { View, Text, StyleSheet, Pressable, TextInput, Keyboard, ScrollView, Alert, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { firebase } from '../config'
import { err } from 'react-native-svg';
import {UploadMediaFile} from './UploadMediaFile';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker'
import * as FileSytem from 'expo-file-system'

const AddData = () => {
    const placeRef = firebase.firestore().collection('place')
    const [addName, setAddName] = useState('')
    const [addDetails, setAddDetails] = useState('')
    const [addImage, setAddImage] = useState('')
    const [nameImage, setNameImage] = useState('')

    // add new field
    const addField = () => {
        if (addName && addName.length > 0 && addDetails && addDetails.length > 0) {
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
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }   

    const [image, setImage] = useState(null)
    const [displayImage, setDisplayImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })

        // console.log(result.assets[0].uri)

        if(!result.canceled) {
            setDisplayImage(result.assets[0].uri)
        }

        const source = {uri: result.assets[0].uri}
        console.log(source)
        setImage(source)
        
        logFileName()

    }

    const logFileName = () => {
        const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
        setNameImage(filename)
        console.log('File name pick is: ' + filename)
    }

    const UploadMediaWeb = async () =>{
        setUploading(true)
        const response = await fetch(image.uri)
        const blob = await response.blob()
        const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
        var ref = firebase.storage().ref().child(filename).put(blob)

        try {
            await ref
        } catch (e) {
            console.log(e)
        }
        setUploading(false)
        Alert.alert('Photo Upload!!!')
        console.log('Photo Upload!!!')
        console.log('File name is: ' + filename)
        setImage(null)
        setDisplayImage(null)
    }

    const submit = () =>
    {
        UploadMediaWeb()
        addField()
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollview} persistentScrollbar={false}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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

                <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                    <Text style={styles.buttonText}>PickMediaFile!</Text>
                </TouchableOpacity>

                    <View style={styles.imageContainer}>
                        { displayImage && 
                            <Image 
                                source={{ uri: displayImage}} 
                                style={{width: 300, height: 300, resizeMode: 'stretch'}}
                        />}
                    </View>
                
                <TouchableOpacity style={styles.uploadButton} onPress={UploadMediaWeb}>
                    <Text style={styles.buttonText}>UploadMediaFile!</Text>
                </TouchableOpacity>
                    <TextInput
                        style={styles.hiddeninput}
                        placeholder='IMG'
                        placeholderTextColor={'#aaaaa'}
                        value={nameImage}
                        multiline={false}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        editable={false}
                        selectTextOnFocus={false}
                    />
                <Pressable style={styles.button} onPress={submit}>
                    <Text style={{color: 'white'}}>Submit</Text>
                </Pressable>
            </View> 
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    scrollview: {
        width: '100%',
    },    
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        maxWidth: 600,        
    },
    hiddeninput: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'grey',
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
        backgroundColor: '#3465B5',
      },
    selectButton: {
        borderRadius: 5,
        width: 'auto',
        padding: 10,
        height: 'auto',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    uploadButton: {
        borderRadius: 5,
        width: 'auto',
        padding: 10,
        height: 'auto',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        flex: 1,
        marginHorizontal: 20,
    },
    imageContainer: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    }

})