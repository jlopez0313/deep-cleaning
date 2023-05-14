import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useIonViewDidEnter } from '@ionic/react';
import { memo, useEffect, useState } from 'react';
import { MapComponent } from './MapComponent';


type Props = {
    mapHeight: ''
}

export const Maps = memo( ({ mapHeight }: Props) => {
    
    useIonViewDidEnter( () => {
        window.dispatchEvent(new Event('resize'));
    })

    return (
        <MapContainer center={[51.505, -0.09]} zoom={17} scrollWheelZoom={false} style={{ height: '100%' }} >
            <MapComponent />
        </MapContainer>
    )
})
