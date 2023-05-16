import { IonButtons, IonBackButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonIcon } from '@ionic/react';
import styles from './Visitas.module.scss';
import { Visita } from '@/components/Visita/Visita';
import { useContext, useEffect, useState } from 'react';
import UIContext from "@/context/Context";
import { qrCodeOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import { findVisita } from '../../services/visitas';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner';

type Props = {
    title: string;
    visitas: any[];
}; /* use `interface` if exporting so that consumers can extend */

export const VisitaPage = () => {
    
    const { setShowTabs }: any = useContext(UIContext);
    const params: any = useParams();
    
    const [visita, setVisita ] = useState({});

    const doGetVisita = async () => {
        const visita = await findVisita( params.id )
        setVisita( visita.data );
    }

    const dataToScan = async () => {
        // const data = await BarcodeScanner.scan();
        // console.log( data );
        // alert(JSON.stringify(data));
        // this.setState({ stringEncoded: data.text })
    };

    useEffect(() => {
        setShowTabs(false);
        doGetVisita();

        return () => {
            setShowTabs(true);
        };
    }, [])

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton type='button' defaultHref='/visitas'></IonBackButton>
                    </IonButtons>
                    <IonTitle> Visita </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding'>
                <Visita visita={visita} />
            </IonContent>
            <IonFooter>
                <IonToolbar className='ion-padding-horizontal'>
                    <IonButton type='button' expand='block' onClick={() => dataToScan()} > 
                        <IonIcon icon={qrCodeOutline} slot='start' />
                        Scan 
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};