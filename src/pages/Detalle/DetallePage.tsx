import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonIcon, useIonLoading, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import UIContext from "@/context/Context";
import { checkmarkOutline, exitOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import { findVisita } from '@/services/visitas';
import { Detalle } from '@/components/Detalle/Detalle';
import { AlertConfirm } from '@/components/shared/AlertConfirm';
import { useHistory } from 'react-router-dom'
import { approveVisita } from '@/services/visitas';

export const DetallePage = () => {

    const history = useHistory();
    const [present, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    
    const { setShowTabs }: any = useContext(UIContext);
    const params: any = useParams();
    
    const [visita, setVisita ] = useState<any>({});
    const [finished, setFinished ] = useState(false);

    const onSetFinished = ( visita: any) => {
        setVisita( visita );
        setFinished( visita.firma ? true : false )
    }

    const doGetVisita = async () => {
        const visita = await findVisita( params.id )
        await setVisita( visita.data );
    }

    const onBackClick = ( clicked: boolean ) => {
        if( clicked ) {
            history.replace('/visitas');
        }
    }

    const onFinishClick = async ( clicked: boolean ) => {
        if( clicked ) {
            visita.estados_id = 3;
            
            const tzoffset = new Date().getTimezoneOffset() * 60000;
            const curDate = new Date( Date.now() - tzoffset ).toISOString();
            visita.approved_at = curDate;

            present({
                message: 'Loading...',
            });
            try {
                await approveVisita( visita );
                presentAlert({
                    header: 'Alerta!',
                    subHeader: 'Mensaje importante.',
                    message: 'La visita ha finalizado! ',
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
                    <IonTitle className='text-white'> Detalle de Visita </IonTitle>
                    <IonButtons slot="end">
                        <IonButton type='button' className='text-white' id="back-button">
                            <IonIcon icon={ exitOutline } />
                        </IonButton>

                        <AlertConfirm message='Realmente deseas salir de esta ejecución?' present='back-button' onButtonClick={(evt: boolean) => onBackClick(evt) } />

                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <Detalle visita={visita} onHasFinished={ ( visita: any ) => onSetFinished( visita ) } />
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