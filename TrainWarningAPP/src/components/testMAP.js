import * as React from 'react'
import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import "../styles/style.css"
import { Icon } from "leaflet"
import MarkerClustererGroup from 'react-leaflet-cluster'

const LeafletMap = (lat, lng, markerList) => {
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

    const customIcon = new Icon({
        iconUrl: "../../assets/railroad-crossing.png",
        iconSize: [24, 24]
    })

    return (
        // <View>
        //     <Text style={{flex: 1, textAlign: "center"}}></Text>
        // </View>
        <>
        <View>
            {/* <Text style={{flex: 1}}></Text> */}
            <MapContainer center={position} zoom={13}>
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
    }
});