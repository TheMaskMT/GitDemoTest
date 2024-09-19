import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
// import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
import "./style.css"
import { Icon } from "leaflet"


const LeafletMap = (lat, lng, markerList, here) => {
    const position = [lat, lng] 

    const markers = []
    for (let i = 0; i < markerList.length; i++) {
        markers.push({
            key: i,
            header: markerList[i].name,
            details: markerList[i].details,
            img: markerList[i].img,
            geocode: (markerList[i].lat !== undefined && markerList[i].log !== undefined)
            ? [markerList[i].lat, markerList[i].log]
            : [0, 0]
        })
    }

    const customIcon = new Icon({
        iconUrl: "../../assets/railroad-crossing.png",
        iconSize: [24, 24]
    })

    const HomeIcon = new Icon({
        iconUrl: "../../assets/maps-and-flags.png",
        iconSize: [30, 30]
    })

    return (
        // <>
        //     <View>
        //         {/* <Text style={{flex: 1}}></Text> */}
        //         <MapContainer
        //             // style={{height: '87.5vh', width: '100wh'}}
        //             style={{height: 536, width: '100wh'}}
        //             center={{lat, lng}}
        //             zoom={(here==true)?17:18}
        //         >
        //             <TileLayer
        //                 attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //             />
                
        //             {markers.map(marker => (
        //                 (marker.geocode && marker.geocode.every !== undefined)
        //                 ?  <Marker position={marker.geocode}>
        //                         <Popup>
        //                             <Text style={styles.header}>{marker.header}</Text>
        //                             <Text style={styles.details}>{marker.details}</Text>
        //                             {(marker.img && marker.img !== null)
        //                             ? <Image src={marker.img} height={150} width={300}></Image>
        //                             : <></>}
        //                         </Popup>
        //                     </Marker>
        //                 : <></>
        //             ))}
        //             {(here == true)
        //             ? <Marker position={{lat, lng}}>
        //                 <Popup>
        //                     <Text style={styles.header}>Bạn</Text>
        //                     <Text style={styles.details}>Đây là chỗ bạn đang đứng!!!</Text>
        //                 </Popup>
        //             </Marker>
        //             :<></>
        //             }
        //         </MapContainer>
        //     </View>
        // </>
        <Text>Hello Bugger</Text>
    )
}

export default LeafletMap

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    details: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
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
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
});