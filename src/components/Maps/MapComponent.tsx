import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

export const MapComponent = () => {

    const map = useMap()

    setTimeout(()=> {
        map.invalidateSize();
    }, 10)
    
    return (
        <>
            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </>
    )
}
