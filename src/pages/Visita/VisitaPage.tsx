import { IonContent, IonPage, IonToolbar, IonFooter, IonButton, IonIcon, useIonViewWillEnter, useIonAlert, useIonViewWillLeave } from '@ionic/react';
import { Visita } from '@/components/Visita/Visita';
import { useContext, useEffect, useState } from 'react';
import UIContext from "@/context/Context";
import { qrCodeOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import { findVisita } from '@/services/visitas';
import { useHistory } from 'react-router-dom'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

export const VisitaPage = () => {
    
    const { setShowTabs }: any = useContext(UIContext);
    const [presentAlert] = useIonAlert();
    const params: any = useParams();
    const history = useHistory();
    
    const [visita, setVisita ] = useState({});
    const [isScanning, setIsScanning ] = useState(false);

    const doGetVisita = async () => {
        try {
            const visita = await findVisita( params.id )
            setVisita( visita.data );
        } catch(error: any) {
            presentAlert({
                header: 'Alerta!',
                subHeader: 'Mensaje importante.',
                message: error.data?.message || 'Error Interno',
                buttons: ['OK'],
            })
        }
    }


    const checkPermission = async () => {
        const status = await BarcodeScanner.checkPermission({ force: true }); 
        if ( status.granted ) {
            return true;
        } else if ( status.denied ) {
            presentAlert({
                header: 'Alerta!',
                subHeader: 'No tienes permisos.',
                message: 'Debes habilitar permisos en los ajustes de tu app! ',
                buttons: ['OK'],
            })
        } else {
            return false;
        }
    }

    const dataToScan = async () => {
        
        const allowed = await checkPermission();

        if (allowed) {
            setIsScanning( true )
            
            // document.querySelector('body')?.classList.add('scanner-active');
            BarcodeScanner.hideBackground();
            const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
            // document.querySelector('body')?.classList.remove('scanner-active');
    
            if (result.hasContent) {
                if ( params.id === result.content) {
                    history.push('/ejecucion/' + params.id)
                } else {
                    presentAlert({
                        header: 'Alerta!',
                        subHeader: 'Mensaje importante.',
                        message: 'Esta visita no corresponde! ',
                        buttons: ['OK'],
                    })
                }

                stopScanning()
            }
        }
    };

    const stopScanning = () => {
        setIsScanning( false )
        BarcodeScanner.stopScan();
    }

    useIonViewWillEnter(() => {
        setShowTabs(false);
    })

    useIonViewWillLeave(()=> {
        stopScanning();
    })

    useEffect(() => {
        doGetVisita();

        return () => {
            stopScanning();
            setShowTabs(true);
        };
    }, [])

    return (
        <IonPage>
            <IonContent className='ion-no-padding' style={{ visibility:  isScanning ? 'hidden' : 'visible' }}>
                <Visita visita={visita} />
            </IonContent>
            <IonFooter>
                <IonToolbar className='ion-padding-horizontal'>
                    {
                        !isScanning
                        ?
                            <IonButton type='button' expand='block' onClick={() => dataToScan()} > 
                                <IonIcon icon={qrCodeOutline} slot='start' />
                                Escanear QR
                            </IonButton>
                        :
                            <IonButton type='button' expand='block' onClick={() => stopScanning()} > 
                                <IonIcon icon={qrCodeOutline} slot='start' />
                                Detener Escaneo
                            </IonButton>
                    }
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};