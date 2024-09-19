import { View, Text, FlatList, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { firebase } from '../../config'
import { Ionicons } from '@expo/vector-icons'
import alert from './alert'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material'


const InfoFlatList = ({navigation}, users, key, numColumns, minHeight) => {
    const placeRef = firebase.firestore().collection('place')

    const detelePlace = (placeId) => {
        alert('Xác nhận', 'Bạn có chắc chắn muốn xóa?', [{
            text: 'Hủy',
            onPress: () => console.log('Đã hủy'),
            style: 'cancel'
        },
        {
            text: 'OK',
            onPress: () => {
                placeRef.doc(placeId).delete()
                console.log('Đã xóa')
            }
        }]
        )
    }

    const editPlace = (id, name, details, img, lat, log, fixedArray, flexibleArray) => {
        navigation.navigate('EditInfo', 
            {
                id,
                name,
                details,
                img,
                lat,
                log,
                fixedArray, 
                flexibleArray
            })
        //console.log(id, name, details, img, lat, log)
    }

    const MapPlace = (id, name, details, img, lat, log) => {
        navigation.navigate('MapLocation', 
            {
                id,
                name,
                details,
                img,
                lat,
                log,
                // fixedArray,
                // flexibleArray
            })
        //console.log(id, name, details, img, lat, log)
    }

    return (
        <FlatList
            style={{width: '100%'}}
            initialNumToRender={20}
            data={users}
            numColumns={numColumns}
            key={key}
            renderItem={({item}) => (
                // <Pressable
                //     style={styles.container}
                //     onPress={() => {
                //         MapPlace(item.id, item.name, item.details, item.img, item.lat, item.log)
                //     }}
                // >
                //     {(item.img && item.img !== "") 
                //         ? <Image
                //             style={[styles.image, {minHeight: minHeight}
                //             //    {width: win/100*85, height: 870*(win/1918)}
                //             ]}
                //             source={{
                //                 uri: item.img
                //             }}
                //         />
                //         : <Text>{typeof item.img}</Text>
                //     }

                //     <View style={styles.innerContainer}>
                //         {/* <Text style={styles.itemName}>{item.id}</Text> */}
                //         <Text style={styles.itemName}>{item.name}</Text>
                //         <Text style={styles.itemDetails}>{item.details}</Text>
                //         <Text style={styles.itemName}>
                //             {new Date((item.createAt.seconds+item.createAt.nanoseconds/1000000000)*1000).toDateString()}
                //             -
                //             {new Date((item.createAt.seconds+item.createAt.nanoseconds/1000000000)*1000).toTimeString()}
                //             {/* {item.createAt.toString()} */}
                //         </Text>

                //         {(item.lat && item.log)
                //             ? <Text style={styles.itemPosition}>{item.lat}; {item.log}</Text>
                //             : <></>
                //         }
                //         {/* <Text style={styles.itemRunTime}>{item.runtime}</Text> */}
                            
                //         {/* <Text style={styles.itemPosition}>{item.position}</Text> */}
                //     </View>
                //     <View style={styles.buttonContainer}>
                //         <TouchableOpacity style={styles.editButton} onPress={() => editPlace(item.id, item.name, item.details, item.img, item.lat, item.log)}>
                //             <Ionicons name={'pencil'} size={24} color={'#EFBF7F'} />
                //         </TouchableOpacity>
                //         <TouchableOpacity style={styles.deleteButton} onPress={() => detelePlace(item.id)}>
                //             <Ionicons name={'trash-bin'} size={24} color={'#EFBF7F'} />
                //         </TouchableOpacity>
                //         {/* <TouchableOpacity style={styles.deleteButton} onPress={() => MapPlace(item.id, item.name, item.details, item.img, item.lat, item.log)}>
                //             <Ionicons name={'map'} size={24} color={'#EFBF7F'} />
                //         </TouchableOpacity> */}
                //     </View>
                // </Pressable>
                <Card sx={styles.container}>
                    <CardActionArea onClick={() => {MapPlace(item.id, item.name, item.details, item.img, item.lat, item.log)}}>
                        <CardMedia
                            sx={{ height: 200, resizeMode: 'stretch', flex: 1}}
                            image={item.img}
                            title={item.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 'bold'}}>
                            {item.name}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {item.details}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    
                    <CardActions sx={{justifyContent: 'right'}}>
                        <Button size="small" onClick={() => editPlace(item.id, item.name, item.details, item.img, item.lat, item.log, item.fixedArray, item.flexibleArray)}>
                            <Ionicons name={'pencil'} size={24} color={'#0A5E7B'}/>
                        </Button>

                        <Button size="small" onClick={() => detelePlace(item.id)}>
                            <Ionicons name={'trash-bin'} size={24} color={'#EB0230'}/>
                        </Button>
                    </CardActions>
                
                </Card>
            )}
        />
    )
}

export default InfoFlatList

const styles = StyleSheet.create({
    container:{
        // backgroundColor: '#D3E4FF',
        backgroundColor: '#F8E5CB',
        // padding: 15,
        borderRadius: 5,
        margin: 1,
        // marginHorizontal: '5%',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1,
        borderColor: '#11113B',
        borderWidth: 1,
        
    },
    innerContainer:{
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        // width: '95%',
        marginVertical: 5,
    },
    itemName: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemDetails: {
        fontWeight: '300',
        textAlign: 'center'
    },
    itemPosition: {
        fontWeight: '400',
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: 'center'
    },
    itemRunTime: {
        fontWeight: '500',
    },

    image: {
        // width: win.width/100*85,
        // height: 870 * ratio,
        // width: '100%',
        // height: 600,
        resizeMode: 'stretch',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignSelf: 'stretch',
        flex: 1,
        marginBottom: 5,
        alignContent: 'center',
        justifyContent: 'center',
        
        // maxWidth: 1080,
        // maxHeight: 720,
    },
    buttonContainer:{
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 5,
        // paddingTop: 10,
        alignSelf: 'stretch',
        // backgroundColor: 'blue',
        width: '100%',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    editButton: {
        // borderRadius: 5,
        width: 'auto',
        // padding: 10,
        // height: 'auto',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // marginHorizontal: 20,
        // marginVertical: 10,
        backgroundColor: '#0A5E7B',
        borderBottomLeftRadius: 15,
        // borderLeftWidth: 0, borderRightWidth: 1, 
        // borderColor: '#F8E5CB'
    },
    deleteButton: {
        // borderRadius: 5,
        width: 'auto',
        // padding: 10,
        // height: 'auto',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // marginHorizontal: 20,
        // marginVertical: 10,
        backgroundColor: '#F20231',
        borderBottomRightRadius: 15,
        // borderLeftWidth: 0, borderRightWidth: 1, 
        // borderTopWidth: 1,
        // borderColor: ''
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
})