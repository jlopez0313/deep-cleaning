import { MapContainer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useIonViewDidEnter } from '@ionic/react';
import { memo } from 'react';
import { MapComponent } from './MapComponent';


type Props = {
    mapHeight: '',
    markers: any[]
}

export const Maps = memo( ({ mapHeight, markers }: Props) => {

    useIonViewDidEnter( () => {
        window.dispatchEvent(new Event('resize'));
    })

    return (
        <MapContainer center={[0, 0]} zoom={10} scrollWheelZoom={false} style={{ height: '100%' }} >
            <MapComponent markers={markers} />
        </MapContainer>
    )
})
