import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import "../styles/style.css"
import { Icon } from "leaflet"


const LeafletMap = (lat, lng, markerList, here) => {
    const position = [lat, lng]
    // const markers = markerList
    // console.log("===========>" + markers)
    

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

    // console.log("===========>" + markerList)
    // const markers = [
    //     {
    //         geocode: [10.953662, 106.832114],
    //         popUP: "Phạm Văn Thuận",
    //         url: "https://firebasestorage.googleapis.com/v0/b/trainwarningapp-f4ac2.appspot.com/o/L%C6%B0u%20V%C4%83n%20Vi%E1%BA%BFt%201.png?alt=media&token=4da33ea6-5d47-4242-973b-37b3006a1ce2"
    //     },
    //     {
    //         geocode: [10.953662, 106.827138],
    //         popUP: "Khu phố 5"
    //     },
    //     {
    //         geocode: [10.946771, 106.826497],
    //         popUP: "Võ Thị Sáu"
    //     }
    // ]

    // const customIcon = new Icon({
    //     iconUrl: "../../assets/railroad-crossing.png",
    //     iconSize: [24, 24]
    // })

    // const HomeIcon = new Icon({
    //     iconUrl: "../../assets/maps-and-flags.png",
    //     iconSize: [30, 30]
    // })

    return (
        // <View>
        //     <Text style={{flex: 1, textAlign: "center"}}></Text>
        // </View>
        <>
        <View>
            {/* <Text style={{flex: 1}}></Text> */}
            <MapContainer
                style={{height: '87.5vh'}}
                center={{lat, lng}}
                zoom={(here==true)?17:18}
                // whenCreated={() => {
                //     mapRef.current = map
                // }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <MarkerClustererGroup>
                    {markers.map(marker => (
                        (marker.geocode && marker.geocode.every !== undefined)
                        ?  <Marker position={marker.geocode} icon={customIcon}>
                                <Popup>
                                    <div style={styles.header}>{marker.header}</div>
                                    <div style={styles.details}>{marker.details}</div>
                                    {(marker.img && marker.img !== null)
                                    ? <img src={marker.img} height={150} width={300}></img>
                                    : <></>}
                                </Popup>
                            </Marker>
                        : <></>
                    ))}
                </MarkerClustererGroup> */}
                
                {/* {markers.map(marker => (
                    (marker.geocode && marker.geocode.every !== undefined)
                    ?  <Marker position={marker.geocode} icon={customIcon}>
                            <Popup>
                                <div style={styles.header}>{marker.header}</div>
                                <div style={styles.details}>{marker.details}</div>
                                {(marker.img && marker.img !== null)
                                ? <img src={marker.img} height={150} width={300}></img>
                                : <></>}
                            </Popup>
                        </Marker>
                    : <></>
                ))}
                {(here == true)
                ? <Marker position={position} icon={HomeIcon}>
                    <Popup>
                        <div style={styles.header}>Bạn</div>
                        <div style={styles.details}>Đây là chỗ bạn đang đứng!!!</div>
                    </Popup>
                </Marker>
                :<></>
                } */}

                {markers.map(marker => (
                    (marker.geocode && marker.geocode.every !== undefined)
                    ?  <Marker position={marker.geocode}>
                            <Popup>
                                <Text style={styles.header}>{marker.header}</Text>
                                <Text style={styles.details}>{marker.details}</Text>
                                {(marker.img && marker.img !== null)
                                ? <Image src={marker.img} height={150} width={300}></Image>
                                : <></>}
                            </Popup>
                        </Marker>
                    : <></>
                ))}
                {(here == true)
                ? <Marker position={{lat, lng}}>
                    <Popup>
                        <Text style={styles.header}>Bạn</Text>
                        <Text style={styles.details}>Đây là chỗ bạn đang đứng!!!</Text>
                    </Popup>
                </Marker>
                :<></>
                }
            </MapContainer>
        </View>
        </>
    )
}

export {LeafletMap}

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