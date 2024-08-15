import { View, Text, FlatList, StyleSheet, Pressable, Image, Dimensions } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { firebase } from '../config'

const win = Dimensions.get('window')
const ratio = win.width/1918

const Fetch = () => {
    const [users, setUsers] = useState([])
    const placeRef = firebase.firestore().collection('place')

    useEffect(() => {
        // Trả về thuộc tính vào mảng users
        placeRef
        .onSnapshot(
            querySnapshot => {
                const users = []
                querySnapshot.forEach((doc) => {
                    const { name, details, test, img, runtime } = doc.data()
                    users.push({
                        id: doc.id,
                        name,
                        details,
                        test,
                        img,
                        runtime
                    })       
                })
                setUsers(users)
            }
        )
    })
    

    return (
        <View style={{ flex: 1, marginTop: 50, backgroundColor: 'none', width: '100%'}}>
            <FlatList
                style={{width: '100%'}}
                data={users}
                numColumns={1}
                renderItem={({item}) => (
                    <Pressable
                        style={styles.container}
                    >
                        <View style={styles.innerContainer}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Text style={styles.itemDetails}>{item.details}</Text>
                          {/* <Text style={styles.itemRunTime}>{item.runtime}</Text> */}
                          <Image
                            style={styles.image}
                            source={{
                                uri: item.img
                            }}
                          />

                          {/* <Text style={styles.itemPosition}>{item.position}</Text> */}
                        </View>
                    </Pressable>
                )}
            />
        </View>
    )
}

export default Fetch

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: '5%',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1
    },
    innerContainer:{
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        // flex: 1,
    },
    itemName: {
        fontWeight: 'bold',
    },
    itemDetails: {
        fontWeight: '300',
    },
    itemPosition: {
        fontWeight: '400',
    },
    itemRunTime: {
        fontWeight: '500',
    },
    image: {
        width: win.width/100*85,
        height: 870 * ratio,
        resizeMode: 'stretch',
        borderRadius: 15,
        alignSelf: 'stretch',
        flex: 1,
        // maxWidth: 900,
        // maxHeight: 720,
    },
})