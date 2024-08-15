import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../config'
import * as ImagePicker from 'expo-image-picker'
import * as FileSytem from 'expo-file-system'
import alert from './components/alert'

export const UploadMediaFile = () => {
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
    }


    // const UploadMediaMobile = async () => {
    //     setUploading(true)

    //     try {
    //         const { uri } = await FileSytem.getInfoAsync(image)
    //         console.log(uri)
    //         const blob = await new Promise((resolve, reject) => {
    //             const xhr = new XMLHttpRequest()
    //             xhr.onload = () => {
    //                 resolve(xhr.response)
    //             }
    //             xhr.onerror = (e) => {
    //                 reject(new TypeError('Network request failed'))
    //             }
    //             xhr.responseType = 'blob'
    //             xhr.open('GET', uri, true)
    //             xhr.send(null)
    //         })
            
    //         const filename = image.substring(image.lastIndexOf('/') + 1)
    //         const ref = firebase.storage().ref().child(filename)
            
    //         await ref.put(blob)
    //         setUploading(false)
    //         Alert.alert('Photo Upload!!!')
    //         setImage(null)
            
    //     } catch (error) {
    //         console.error(error)
    //         setUploading(false)
    //     }
    // }

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
        // Alert.alert('Photo Upload!!!')
        console.log('Photo Upload!!!')
        alert('Photo Upload!!!','IMG had upload!!!')
        console.log('File name is: ' + filename)
        setImage(null)
        setDisplayImage(null)
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <ScrollView style={styles.scrollview}> */}
                <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                    <Text style={styles.buttonText}>PickMediaFile!</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    { displayImage && 
                        <Image 
                            source={{ uri: displayImage}} 
                            style={{width: 300, height: 300, resizeMode: 'stretch', backgroundColor: 'black'}}
                    />}
                </View>
                <TouchableOpacity style={styles.uploadButton} onPress={UploadMediaWeb}>
                    <Text style={styles.buttonText}>UploadMediaFile!</Text>
                </TouchableOpacity>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollview: {
        backgroundColor: 'pink',
        marginHorizontal: 0,
    },
    selectButton: {
        borderRadius: 5,
        width: 150,
        height: 'auto',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 'auto',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backfaceVisibility: 'hidden'
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
        height: '50%',
        width: '100%',
    }

})