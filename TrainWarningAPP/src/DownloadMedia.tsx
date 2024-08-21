import { View, Text, Image, ScrollView, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import { getStorage, ref, getDownloadURL, getMetadata } from "firebase/storage"

export function DownloadMedia() {
    // const [imgURL, setImgURL] = useState('')
    // const [typeIMG, settypeIMG] = useState('')
    
    // const storage = getStorage()
    
    // const filename = 'B1obXmi+H5hXAAAAAElFTkSuQmCC'

    // getDownloadURL(ref(storage, filename))
    //     .then((url) => {
    //         setImgURL(url)
    //         console.log(url)
    //     })
    
    //     .catch((error) => {
    //         console.log(error)
    //     })

    // getMetadata(ref(storage, filename))
    // .then((metadata) => {
    //     console.log(metadata)
    //     settypeIMG(metadata.contentType.slice(6))
    // })

    // .catch((error) => {
    //    console.log(error)
    // })

    return (
      <View style={[styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
        ]}>
        <View style={{backgroundColor: '#11113C', flex: 1}}/>
        <View style={{backgroundColor: '#0A5E7B', flex: 1}}/>
        <View style={{backgroundColor: '#F20231', flex: 1}}/>
        <View style={{backgroundColor: '#EFBF7F', flex: 1}}/>
        <View style={{backgroundColor: '#F8E5CB', flex: 1}}/>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
  });