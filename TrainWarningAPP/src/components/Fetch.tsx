import { View, StyleSheet, Dimensions} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../../config'
import  InfoFlatList from './InfoFlatList'

const Fetch = ({navigation}) => {
    const [users, setUsers] = useState([])
    const placeRef = firebase.firestore().collection('place')

    const [win, setWin] = useState(Dimensions.get('window').width)

    useEffect(() => {
        // Trả về thuộc tính vào mảng users
        placeRef
        .orderBy('name')
        .onSnapshot(
            querySnapshot => {
                const users = []
                querySnapshot.forEach((doc) => {
                    const { name, details, img, lat, log} = doc.data()
                    users.push({
                        id: doc.id,
                        name,
                        details,
                        img,
                        lat,
                        log
                    })
                })
                setUsers(users)
            }
        )

        const updateLayout = () =>{
            setWin(Dimensions.get('window').width)
        }
        Dimensions.addEventListener('change', updateLayout)
    })
    
    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'none', width: '100%'}}>
                {(win > 1400)
                ? InfoFlatList({navigation}, users, '@', 3 , 300)
                : (win > 800)
                ? InfoFlatList({navigation}, users, '#', 2 , 400)
                : InfoFlatList({navigation}, users, '$', 1 , 500)
                }
            </View>
        </>
    )
}

export { Fetch }

const styles = StyleSheet.create({
    
})