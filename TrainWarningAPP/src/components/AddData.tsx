import { View, Text, StyleSheet, Pressable, TextInput, Keyboard, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { firebase } from '../../config'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker'
import alert from './alert';
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import * as Progress from 'react-native-progress';
import { cert } from 'firebase-admin/app';

const AddData = () => {
    const placeRef = firebase.firestore().collection('place')
    const storage = getStorage()
    
    const [addName, setAddName] = useState('')
    const [addDetails, setAddDetails] = useState('')

    // Lưu dữ liệu
    const addField = (name: string | any[], details: string | any[], imgURL: string | any[]) => {
        if (name && name.length > 0 && details && details.length > 0 && imgURL && imgURL.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp()
            const data = {
                name,
                createAt: timestamp,
                details,
                img: imgURL,
            }
            placeRef
                .add(data)
                .then(() => {
                    setAddName('')
                    setAddDetails('')
                    setDisplayImage('')
                    setImage('')
                    Keyboard.dismiss()
                    setAnimation(false)
                })
                .catch((error) => {
                    alert(error)
                })
        }
        else {
            console.log('Không thể lưu dữ liệu đã nhập!!!')
            alert('Lỗi', 'Không thể lưu dữ liệu đã nhập!!!')
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
        
        //logFileName()

    }

    const UploadMediaWeb = async () => {
        setUploading(true)
        const response = await fetch(image.uri)
        const blob = await response.blob()
        const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
      
        const result = {
            IsSuccess: false,
            ErrorMessage: '',
            FileName: ''
        }

        try {
            var ref = await firebase.storage().ref().child(filename).put(blob)
            if (ref) {
                result.IsSuccess = true
                result.FileName = filename
            }
            return result
        } catch (e) {
            result.ErrorMessage = e
            return result
        }
       
    }

    const getImageURL = async (nameImage) => {
        const result = {
            IsSuccess: false,
            URL: '',
            ErrorMessage: '',
        }
        
        try {
            var url = await getDownloadURL(ref(storage, nameImage)) 
            if(url) {    
                result.IsSuccess = true
                result.URL = url
            }
            return result
        } catch (e) {
            result.ErrorMessage = e
            return result
        }    
    }

    const [animation, setAnimation] = useState(false)
    
    const submit = () =>
    {
        setAnimation(true)
        console.log('Đang chạy!!!')
        UploadMediaWeb()
        .then((res) => {
            console.log('Done!!!')
            if(res.FileName && res.FileName.length > 0) {
                console.log('Đang chạy test!!!')
                getImageURL(res.FileName)
                .then((url) =>{
                    addField(addName, addDetails, url.URL)
                })
            } 
            else {
                console.log('Không chạy được test!!!')
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollview} persistentScrollbar={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%'}}>
                    <Text style = {styles.header}>Nhập dữ liệu địa điểm</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Tên'
                        placeholderTextColor={'#aaaaa'}
                        onChangeText={(name) => setAddName(name)}
                        value={addName}
                        multiline={false}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Chi tiết'
                        placeholderTextColor={'#aaaaa'}
                        onChangeText={(details) => setAddDetails(details)}
                        value={addDetails}
                        multiline={true}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                    />
                    <View style={styles.positionContainer}>
                        <TextInput
                            style={styles.inputPosition}
                            placeholder='Lat'
                            placeholderTextColor={'#aaaaa'}
                            onChangeText={(name) => setAddName(name)}
                            value={addName}
                            multiline={false}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                        />
                            <TextInput
                            style={styles.inputPosition}
                            placeholder='Log'
                            placeholderTextColor={'#aaaaa'}
                            onChangeText={(name) => setAddName(name)}
                            value={addName}
                            multiline={false}
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                        />
                    </View>
                    {/* Dùng TouchableOpacity vì nó đơn giản, cần phức tạp thì Pressable */}
                    <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                        <Text style={styles.buttonText}>Chọn ảnh</Text>
                    </TouchableOpacity>

                    { displayImage
                        ? <View style={styles.imageContainer}>
                            { displayImage && 
                                <Image 
                                    source={{ uri: displayImage}} 
                                    style={{width: 300, height: 300, resizeMode: 'stretch'}}
                            />}
                            </View>
                        : <></>
                    }
                    
                    <TouchableOpacity style={styles.button} onPress={submit}>
                        <Text style={styles.buttonText}>Lưu</Text>
                    </TouchableOpacity>
                    <Progress.CircleSnail animating={animation} hidesWhenStopped= {true} color={['red', 'green', 'blue']} />

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
        marginVertical: 5,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        maxWidth: 600,
        minWidth: 300,
    },
    inputPosition: {
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        maxWidth: 145,
        minWidth: 50,
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
        borderRadius: 5,
        width: 'auto',
        padding: 10,
        height: 'auto',
        backgroundColor: '#3465B5',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 10,
      },
    selectButton: {
        borderRadius: 5,
        width: 'auto',
        padding: 10,
        height: 'auto',
        backgroundColor: '#B8B8B8',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    positionContainer: {
        flex: 1, 
        flexDirection: 'row', 
        maxWidth: 600,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
        
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