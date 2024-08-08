import { APIProvider, Map, MapCameraChangedEvent, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

export function GoogleMap(lat, lng){
    return(
        <APIProvider apiKey={'AIzaSyDT89cRmK5OrNWQEKNxEyIvVlZxNpInF-0'} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
        defaultZoom={26}
        defaultCenter={ { lat, lng } }
        onCameraChanged={ (ev: MapCameraChangedEvent) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }>
            {/* Mở khi đã Billing */}
            {/* <PoiMarkers pois={locations} /> */}
        </Map>
        </APIProvider>
    )
}