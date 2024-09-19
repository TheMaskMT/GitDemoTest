import { Map, MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native'
import L, { Icon } from "leaflet"
// import 'leaflet/dist/leaflet.css'
// import 'leaflet/dist/leaflet'
// import './../styles/style.css'

export default function TestZone() {

  return (
    <div className='App'>
      <MapContainer center = {[39.50, -98.35]} zoom={4}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
         attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'>
        </TileLayer>
        <HandleClickMap></HandleClickMap>
      </MapContainer>
      Testing
    </div>
	)
}

const styles = StyleSheet.create({
	button: {
        borderRadius: 5,
        width: 'auto',
        padding: 10,
        height: 'auto',
        backgroundColor: '#3465B5',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
    },
	p: {
		marginTop: 5,
	},
	inputPosition: {
		borderWidth: 1,
		borderColor: 'black',
		marginVertical: 10,
		marginHorizontal: 5,
		padding: 10,
		fontSize: 18,
		borderRadius: 6,
		maxWidth: 145,
	},
	buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
})