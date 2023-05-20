import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonIcon, useIonLoading, useIonAlert } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import UIContext from "@/context/Context";
import { checkmarkOutline, exitOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import { findVisita } from '@/services/visitas';
import { Ejecucion } from '@/components/Ejecucion/Ejecucion';
import { AlertConfirm } from '@/components/shared/AlertConfirm';
import { useHistory } from 'react-router-dom'
import { finishVisita } from '@/services/visitas';
import { Geolocation } from '@capacitor/geolocation';

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

    const checkPermission = async () => {
        const status = await Geolocation.checkPermissions(); 
        if ( status ) {
            return true;
        } else {
            presentAlert({
                header: 'Alerta!',
                subHeader: 'No tienes permisos.',
                message: 'Debes habilitar permisos en los ajustes de tu app! ',
                buttons: ['OK'],
            })

            Geolocation.requestPermissions()
        }
    }

    const doGetVisita = async () => {

        const allowed = await checkPermission();
        if ( allowed ) {
            const coordinates = await Geolocation.getCurrentPosition();        
            const visita = await findVisita( params.id )
            
            visita.data.started_at = new Date().toISOString()
            visita.data.latitud = coordinates.coords.latitude;
            visita.data.longitud = coordinates.coords.longitude;
    
            setVisita( visita.data );
        }
    }

    const onBackClick = ( clicked: boolean ) => {
        if( clicked ) {
            history.replace('/visitas');
        }
    }

    const onFinishClick = async ( clicked: boolean ) => {
        if( clicked ) {
            visita.finished_at = new Date().toISOString()
            present({
                message: 'Loading...',
            });
            try {
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

    useEffect(() => {
        setShowTabs(false);
        doGetVisita();
    }, [])

    return (
        <IonPage>
            <IonHeader className='layout'>
                <IonToolbar color='primary'>
                    <IonTitle className='text-white'> Ejecución de Visita </IonTitle>
                    <IonButtons slot="end">
                        <IonButton type='button' className='text-white' id="back-button">
                            <IonIcon icon={ exitOutline } />
                        </IonButton>

                        <AlertConfirm message='Realmente deseas salir?' present='back-button' onButtonClick={(evt: boolean) => onBackClick(evt) } />

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