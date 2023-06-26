import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonIcon, useIonLoading, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import UIContext from "@/context/Context";
import { checkmarkOutline, exitOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import { findVisita } from '@/services/visitas';
import { Ejecucion } from '@/components/Ejecucion/Ejecucion';
import { AlertConfirm } from '@/components/shared/AlertConfirm';
import { useHistory } from 'react-router-dom'
import { finishVisita, sendEvidence } from '@/services/visitas';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Coordinates } from '@/helpers/Coordinates';

export const EjecucionPage = () => {

    const history = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    
    const { setShowTabs }: any = useContext(UIContext);
    const params: any = useParams();
    
    const [visita, setVisita ] = useState<any>({});
    const [finished, setFinished ] = useState(false);

    const onSetFinished = ( visita: any) => {
        setVisita( visita );
        setFinished( true )
    }

    const onGetDistance = (currentPosition: Position, visita: any ) => {
        const { getDistance } = Coordinates( currentPosition, { lat: visita.local.latitud || 0, lon: visita.local.longitud || 0  } )
        return getDistance();
    }

    const checkPermission = async ( ) => {
        try {
            const status = await Geolocation.checkPermissions(); 

            console.log( 'status ', status);

            if ( status ) {
                return true;
            } else {
                presentAlert({
                    header: 'Alerta!',
                    subHeader: 'No tienes permisos.',
                    message: 'Debes habilitar permisos en los ajustes de tu app! ',
                    buttons: ['OK'],
                })
    
                Geolocation.requestPermissions();
                return ;
            }
        } catch {
            presentAlert({
                header: 'Alerta!',
                subHeader: 'No tienes permisos.',
                message: 'Debes activar tu GPS y habilitar todos los permisos en los ajustes de tu app! ',
                buttons: ['OK'],
            })

            history.goBack();
            return ;
        }
    }

    const doGetVisita = async () => {

        const allowed = await checkPermission();
        if ( allowed ) {

            const coordinates = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
            });

            const visita = await findVisita( params.id )

            visita.data.started_at = new Date().toISOString()
            visita.data.latitud = coordinates.coords.latitude;
            visita.data.longitud = coordinates.coords.longitude;

            console.log(coordinates, visita.data);            
            
            const distance = onGetDistance( coordinates, visita.data )
            if ( (distance * 1000) <= 30 ) {
                await setVisita( visita.data );
            } else {
                presentAlert({
                    header: 'Alerta!',
                    subHeader: 'Excedes distancia: ' + (distance * 1000).toFixed() + 'mts',
                    message: 'Debes acercarte mas a la ubicación del sitio! ',
                    buttons: ['OK'],
                })

                history.goBack();
            }

        }
    }

    const onBackClick = ( clicked: boolean ) => {
        if( clicked ) {
            history.replace('/visitas');
        }
    }

    const onFinishClick = async ( clicked: boolean ) => {
        if( clicked ) {
            const tzoffset = new Date().getTimezoneOffset() * 60000;
            const curDate = new Date( Date.now() - tzoffset ).toISOString();
            visita.finished_at = curDate;
            present({
                message: 'Loading...',
            });
            try {

                visita.checklist.forEach( async (item: any) => {
                    await sendEvidence(item)
                })

                await finishVisita( visita );
                
                presentAlert({
                    header: 'Alerta!',
                    subHeader: 'Mensaje importante.',
                    message: 'Tu visita ha finalizado! ',
                    buttons: ['OK'],
                })
    
                history.replace('/visitas');
            } catch(error: any) {
                presentAlert({
                    header: 'Alerta!',
                    subHeader: 'Mensaje importante.',
                    message: error.data?.message || 'Error Interno',
                    buttons: ['OK'],
                })
            } finally {
                dismiss();
            }
        }
    }

    useIonViewWillEnter(() => {
        setShowTabs(false);
        doGetVisita();
    })

    return (
        <IonPage>
            <IonHeader className='layout'>
                <IonToolbar color='primary'>
                    <IonTitle className='text-white'> Ejecución de Visita </IonTitle>
                    <IonButtons slot="end">
                        <IonButton type='button' className='text-white' id="back-button">
                            <IonIcon icon={ exitOutline } />
                        </IonButton>

                        <AlertConfirm message='Realmente deseas salir de esta ejecución?' present='back-button' onButtonClick={(evt: boolean) => onBackClick(evt) } />

                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <Ejecucion visita={visita} onFinished={ ( visita: any ) => onSetFinished( visita ) } />
            </IonContent>
            <IonFooter>
                <IonToolbar className='ion-padding-horizontal'>
                    <IonButton disabled={!finished} type='button' expand='block' id='finish-button' > 
                        Finalizar
                        <IonIcon icon={checkmarkOutline} slot='end' />
                    </IonButton>

                    <AlertConfirm message='Deseas finalizar la visita?' present='finish-button' onButtonClick={(evt: boolean) => onFinishClick(evt) } />

                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};