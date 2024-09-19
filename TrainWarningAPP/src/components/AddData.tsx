import { View, Text, StyleSheet, Pressable, Keyboard, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import { firebase } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import alert from './alert';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as Progress from 'react-native-progress';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const AddData = () => {
    //Thêm đường dẫn của lần lượt của Database Firebase và Storage
    const placeRef = firebase.firestore().collection('place')
    const storage = getStorage()

    const [addName, setAddName] = useState('')
    const [addDetails, setAddDetails] = useState('')
    const [addLat, setAddLat] = useState('')
    const [addLog, setAddLog] = useState('')

    const [flexibleTime, setFlexibleTime] = useState<Dayjs | null>(dayjs(new Date().toISOString()))
    const [flexibleTimeArray, setFlexibleTimeArray] = useState([])
    const [fixedTime, setFixedTime] = useState<Dayjs | null>(dayjs(new Date().toISOString()))
    const [fixedTimeArray, setFixedTimeArray] = useState([])

    // Lưu dữ liệu
    const addField = (name: string | any[], details: string | any[], imgURL: string | any[], lat: number | any[], log: number | any[], fixedtime, flexibletime) => {
        if (name && name.length > 0 &&
            details && details.length > 0 &&
            imgURL && imgURL.length > 0 &&
            lat && log) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp()
            const data = {
                name,
                createAt: timestamp,
                details,
                img: imgURL,
                lat,
                log,
                fixedtime,
                flexibletime,
            }
            placeRef
                .add(data)
                .then(() => {
                    setAddName('')
                    setAddDetails('')
                    setDisplayImage('')
                    setImage('')
                    setAddLat('')
                    setAddLog('')
                    setFixedTime(dayjs(new Date().toISOString()))                    
                    setFixedTimeArray([])
                    setFlexibleTime(dayjs(new Date().toISOString())) 
                    setFlexibleTimeArray([])
                    Keyboard.dismiss()
                    alert('Đã upload xong!!!')
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
            aspect: [4, 3],
            quality: 1
        })

        // console.log(result.assets[0].uri)

        if (!result.canceled) {
            setDisplayImage(result.assets[0].uri)
        }

        const source = { uri: result.assets[0].uri }
        console.log(source)
        setImage(source)

        //logFileName()

    }

    const UploadMediaWeb = async () => {
        setUploading(true)
        const response = await fetch(image.uri)
        const blob = await response.blob()
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1)

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
            if (url) {
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

    const submit = () => {
        setAnimation(true)
        // console.log('Đang chạy!!!')
        UploadMediaWeb()
            .then((res) => {
                // console.log('Done!!!')
                if (res.FileName && res.FileName.length > 0) {
                    // console.log('Đang chạy test!!!')
                    getImageURL(res.FileName)
                        .then((url) => {
                            addField(addName, addDetails, url.URL, Number(addLat), Number(addLog), flexibleTimeArray, fixedTimeArray)
                        })
                }
                else {
                    console.log('Không chạy được test!!!')
                }
            })
    }
    
    const addFlexibleTime = () => {
        const newItem = flexibleTime.toDate()
        setFlexibleTimeArray(prevItems => [...prevItems, newItem])
    }

    const deleteFlexibleTime = (index) => {
        const updatedItems = flexibleTimeArray.filter((_, i) => i !== index); // Filter out the item by index
        setFlexibleTimeArray(updatedItems);
        // console.log(index)
    }

    const addFixedTime = () => {
        const newItem = fixedTime.toDate()
        setFixedTimeArray(prevItems => [...prevItems, newItem])
    }

    const deleteFixedTime = (index) => {
        const updatedItems = fixedTimeArray.filter((_, i) => i !== index); // Filter out the item by index
        setFixedTimeArray(updatedItems);
        // console.log(index)
    }

    const dummyData = () => {
        setAddName('Địa điểm test ')
        setAddDetails('Testing')
        setAddLat((Math.random()*100).toString())
        setAddLog((Math.random()*100).toString())
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollview} persistentScrollbar={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }}>
                    <Text style={styles.header}>Nhập dữ liệu địa điểm</Text>
                    <TextInput
                        style={styles.input}
                        label='Tên'
                        placeholder='Tên'
                        placeholderTextColor={'#B8B8B8'}
                        onChangeText={(name) => setAddName(name)}
                        value={addName}
                        multiline={false}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={[styles.input, { textAlignVertical: 'top', }]}
                        label='Chi tiết'
                        placeholder='Chi tiết'
                        placeholderTextColor={'#B8B8B8'}
                        onChangeText={(details) => setAddDetails(details)}
                        value={addDetails}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                    />
                    <View style={styles.positionContainer}>
                        <TextInput
                            style={styles.inputPosition}
                            label='Lat'
                            placeholder='Lat'
                            placeholderTextColor={'#B8B8B8'}
                            onChangeText={(lat) => setAddLat(lat)}
                            value={String(addLat)}
                            multiline={false}
                            underlineColorAndroid='transparent'
                            keyboardType='numeric'
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={styles.inputPosition}
                            label='Log'
                            placeholder='Log'
                            placeholderTextColor={'#B8B8B8'}
                            onChangeText={(log) => setAddLog(log)}
                            value={String(addLog)}
                            multiline={false}
                            underlineColorAndroid='transparent'
                            keyboardType='numeric'
                            autoCapitalize='none'
                        />
                    </View>
                    
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}>
                        <View style={{flexDirection: 'row'}}>
                            {/* <View 
                                style={styles.timecontainer}
                            >
                                <DateTimePicker
                                    label="Giờ tàu chạy linh hoạt"
                                    format='DD-MM-YYYY HH:mm'
                                    ampm={false}
                                    timeSteps={{hours: 1, minutes: 1}}
                                    value={flexibleTime}
                                    onChange={(flexibleTime) => {
                                        setFlexibleTime(flexibleTime)
                                    }}
                                />
                                <Button onPress={addFlexibleTime}>Thêm giờ tàu chạy linh hoạt</Button>
                                <View style={{backgroundColor: '#E7E0EC'}}>
                                    {flexibleTimeArray.map((item, index) => (
                                        <Text>
                                            <Text>Ngày {item.getDate()} tháng {item.getMonth()+1} năm {item.getFullYear()}, {(item.getHours()>9)?item.getHours():'0'+item.getHours()}:{(item.getMinutes()>9)?item.getMinutes():'0'+item.getMinutes()}</Text>
                                            <Button onPress={() => deleteFlexibleTime(index)}>
                                                Delete
                                            </Button>
                                        </Text>
                                    ))}
                                </View>
                            </View> */}

                            {/* <View style={styles.timecontainer}>
                                <TimePicker 
                                    label="Giờ tàu chạy cố định" 
                                    ampm={false}
                                    timeSteps={{hours: 1, minutes: 1}}
                                    value={fixedTime}
                                    onChange={(fixedTime) => {
                                        setFixedTime(fixedTime)
                                    }}
                                />
                                <Button onPress={addFixedTime}>Thêm giờ tàu chạy cố định</Button>

                                <View style={{backgroundColor: '#E7E0EC'}}>
                                {fixedTimeArray.map((item, index) => (
                                    <Text>
                                        <Text>{(item.getHours()>9)?item.getHours():'0'+item.getHours()}:{(item.getMinutes()>9)?item.getMinutes():'0'+item.getMinutes()}</Text>
                                        <Button onPress={() => deleteFixedTime(index)}>Delete</Button>
                                    </Text>
                                ))}
                                </View>
                            </View> */}
                            <Text>Thử nghiệm Localization</Text>
                        </View>
                    </LocalizationProvider>
  
                    {/* Dùng TouchableOpacity vì nó đơn giản, cần phức tạp thì Pressable */}
                    <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                        <Text style={styles.buttonText}>Chọn ảnh</Text>
                    </TouchableOpacity>

                    {displayImage
                        ? <View style={styles.imageContainer}>
                            {displayImage &&
                                <Image
                                    source={{ uri: displayImage }}
                                    style={{ width: 300, height: 300, resizeMode: 'stretch' }}
                                />}
                        </View>
                        : <></>
                    }

                    <Progress.CircleSnail animating={animation} hidesWhenStopped={true} color={['red', 'green', 'blue']} />
                    <TouchableOpacity style={styles.button} onPress={submit}>
                        <Text style={styles.buttonText}>Lưu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={dummyData}>
                        <Text style={styles.buttonText}>Dummy data</Text>
                    </TouchableOpacity>
                    <Text>Thử nghiệm lần nữa</Text>
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
        marginVertical: 5,
        padding: 10,
        maxWidth: 600,
        minWidth: 300,
        width: '80%'
    },
    positionContainer: {
        flex: 1,
        flexDirection: 'row',
        maxWidth: 600,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginVertical: 20,
        width:  '80%'
    },
    inputPosition: {
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 10,
        minWidth: 145,
        width: '49%'
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
    timecontainer: {
        flex: 1,
        margin: 5,
        marginHorizontal: 5,
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