import React, { memo, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'

type Props = {
    markers: any[]
}

export const MapComponent = memo( ( { markers }: Props ) => {

    const map = useMap();

    const iconRetinaUrl = '/assets/images/marker-icon-2x.png';
    const iconUrl = '/assets/images/marker-icon.png';
    const shadowUrl = '/assets/images/marker-shadow.png';
    const iconDefault = new Icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    });

    useEffect(() => {
        if(markers.length > 0) {
            map.setView([markers[0].latitud, markers[0].longitud]);
        }
    }, [markers]);

    setTimeout(()=> {
        map.invalidateSize();
    }, 10)
    
    return (
        <>
            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
            {
                markers.map( (marker: any, key) => {
                    return (
                        <Marker position={[marker.latitud, marker.longitud]} key={key} icon={iconDefault}>
                            <Popup>
                                { marker.local }
                            </Popup>
                        </Marker>
                    )
                })
            }
        </>
    )
})
