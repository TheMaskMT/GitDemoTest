import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config'

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
                    const { name, details, test} = doc.data()
                    users.push({
                        id: doc.id,
                        name,
                        details,
                        test,
                    })       
                })
                setUsers(users)
            }
        )
    })
    

    return (
        <View style={{ flex: 1, marginTop: 100}}>
            <FlatList
                style={{height:'100%'}}
                data={users}
                numColumns={1}
                renderItem={({item}) => (
                    <Pressable
                        style={styles.container}
                    >
                        <View style={styles.innerContainer}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Text style={styles.itemDetails}>{item.details}</Text>
                          <Text style={styles.itemRunTime}>{item.test}</Text>
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
        marginHorizontal: 10,
    },
    innerContainer:{
        alignItems: 'center',
        flexDirection: 'column',
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
})