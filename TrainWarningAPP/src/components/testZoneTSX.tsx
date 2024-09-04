import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import React, { useState, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native'
import { Icon } from "leaflet"
import 'leaflet/dist/leaflet.css'

// function LocationMarker() {
// 	const [position, setPosition] = useState(null)

// 	const mapLocation = useMapEvents({
// 		click() {
// 			mapLocation.locate()
// 		},
// 		locationfound(e) {
// 			setPosition(e.latlng)
// 			mapLocation.flyTo(e.latlng, mapLocation.getZoom())
// 		},
// 	})

// 	const HomeIcon = new Icon({
//         iconUrl: "../../assets/maps-and-flags.png",
//         iconSize: [30, 30]
//     })

// 	return position === null ? null : (
// 		<Marker position={position} icon={HomeIcon}>
// 			<Popup>You are here</Popup>
// 		</Marker>
// 	)
// }



export default function TestZoneTSX() {	
	const [addLat, setAddLat] = useState('')
	const [addLog, setAddLog] = useState('')

	const mapRef = useRef()

	function LocationMarkerFly() {
		const { current = {} } = mapRef
		const { leafletElement: map } = current
		map.setView([10, 100], 14)
	}


	return (
        <View style={{flexDirection: 'row'}}>
			<View style={{flex:1}}>
				<View>
					<TextInput
						style={styles.inputPosition}
						placeholder='Lat'
						placeholderTextColor={'#aaaaa'}
						onChangeText={(lat) => setAddLat(lat)}
						value={String(addLat)}
						multiline={false}
						underlineColorAndroid='transparent'
						keyboardType='numeric'
						autoCapitalize='none'
					/>
					<TextInput
						style={styles.inputPosition}
						placeholder='Log'
						placeholderTextColor={'#aaaaa'}
						onChangeText={(log) => setAddLog(log)}
						value={String(addLog)}
						multiline={false}
						underlineColorAndroid='transparent'
						keyboardType='numeric'
						autoCapitalize='none'
					/>
				</View>
				
				<TouchableOpacity style={styles.button} onPress={LocationMarkerFly}>
                    <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
			</View>

			<MapContainer center={[51.505, -0.09]} zoom={26} scrollWheelZoom={true} style={{flex: 4}} ref={mapRef}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{/* <Marker position={[51.505, -0.09]} icon={HomeIcon}>
					<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker> */}
				{/* <LocationMarker/> */}
			</MapContainer>
        </View>
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