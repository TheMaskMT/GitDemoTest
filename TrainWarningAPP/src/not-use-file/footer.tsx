import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const win = Dimensions.get('window')
const ratio = win.width/1918

export function FooterMenu (){
    return (
        <View style ={styles.container}>
            <Pressable style ={styles.button}>
                <FontAwesome5 name='home' style = {styles.iconStyle}/>
                <Text>Home</Text>
            </Pressable>
            <Pressable style ={styles.button}>
                <Ionicons name='information-circle' style = {styles.iconStyle}/>
                <Text>Info</Text>
            </Pressable>
            <Pressable style ={styles.button}>
                <AntDesign name='form' style = {styles.iconStyle}/>
                <Text>InputInfo</Text>
            </Pressable>
            <Pressable style ={styles.button}>
                <FontAwesome5 name='map' style = {styles.iconStyle}/>
                <Text>Map</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#5D9DFF'
    },
    button: {
        padding: 5,
        marginHorizontal: '5%',
    },
    iconStyle: {
        marginBottom: 3,
        alignSelf: 'center',
        fontSize: win.width/22 < 40 ? win.width/22 : 40,
    }

})