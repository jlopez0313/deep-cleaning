import { Position } from '@capacitor/geolocation';

export const Coordinates = (currentPosition: Position, localPosition: any) => {
  
    const getDistance = () => {
        
        // Convertir todas las coordenadas a radianes
        const lat1 = gradosARadianes(currentPosition.coords.latitude);
        const lon1 = gradosARadianes(currentPosition.coords.longitude);
        const lat2 = gradosARadianes(localPosition.lat);
        const lon2 = gradosARadianes(localPosition.lon);
        
        // Aplicar fórmula
        const RADIO_TIERRA_EN_KILOMETROS = 6371;
        let diferenciaEntreLongitudes = Math.abs(lon2 - lon1);
        let diferenciaEntreLatitudes = Math.abs(lat2 - lat1);
        
        let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
        
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return RADIO_TIERRA_EN_KILOMETROS * c;
    };
    
    const gradosARadianes = (grados: number) => {
        return grados * Math.PI / 180;
    };

    return {
        getDistance
    }
}
