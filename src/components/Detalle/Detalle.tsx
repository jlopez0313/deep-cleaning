import React, { Fragment, useEffect, useState } from 'react'
import { IonButton, IonCard, IonCardContent, IonCol, IonIcon, IonImg, IonItem, IonLabel, IonList, IonRow, IonSkeletonText, IonText, IonThumbnail } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import styles from './Detalle.module.scss';
import { attachOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import { getPhotoUrl } from '@/helpers/photos';
import SignatureCanvas from 'react-signature-canvas'

type Servicio = {
    id: string;
    done: string;
    evidencia: string;
    categoria: {
        categoria: string
    }
}

type Props = {
    visita: {
        firma: null,
        start_date: '',
        end_date: '',
        local: {
            local: string;
            foto: string;
            direccion: string;
        },
        checklist: [Servicio]
    },
    onHasFinished: ( visita: any) => void,
}

export const Detalle = ( {visita, onHasFinished}: Props ) => {
   
    let sigPad: any = {};
    const [data, setVisita] = useState( visita );
    
    const clear = () => {
        sigPad.clear();
        sigPad.on();
        onSetVisita( null );
    }

    const trim = () => {
        const firma = sigPad.getTrimmedCanvas().toDataURL('image/png');;
        onSetVisita( firma );
        sigPad.off();
    }

    const onSetVisita = async( firma: string | null ) => {
        const visita: any = {...data}
        visita.firma = firma;
        await setVisita( visita );
        onHasFinished( visita )
    }

    useEffect(() => {
        setVisita(visita)
    }, [visita])

    return (
        <>
            <IonLabel >
                <strong> Información Básica </strong>
            </IonLabel>
            
            <IonCard className='ion-no-padding'>
                <IonCardContent>
                    <IonItem class={`ion-no-padding ${styles.visita}`} lines='none'>
                        {
                            data?.local ? 
                            <>
                                <IonThumbnail slot="start">
                                    <IonImg src={ getPhotoUrl( data.local.foto ) } />
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>
                                        <strong> { data.local.local } </strong>
                                    </h3>
                                    <p>
                                        { data.local.direccion }
                                    </p>
                                </IonLabel>
                            </>
                            :
                            <>
                                <IonThumbnail slot="start">
                                    <IonSkeletonText animated={true} />
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>
                                        <IonSkeletonText animated={true} style={{ width: '50%' }} />
                                    </h3>
                                    <p>
                                        <IonSkeletonText animated={true} style={{ width: '70%' }} />
                                    </p>
                                </IonLabel>
                            </>

                        }
                    </IonItem>
                </IonCardContent>
            </IonCard>

            <IonList class='ion-margin-bottom'>
            {
                data?.checklist?.map( (service, idx) => {
                    return (
                        <Fragment key={idx}>
                            <IonItem lines='none'>
                                <strong> { service.categoria.categoria } </strong>
                            </IonItem>
                            {
                                service.evidencia && <IonImg src={ getPhotoUrl(service.evidencia) } />
                            }
                        </Fragment>
                    )
                })
            }
            </IonList>

            <strong> Firma: </strong>
            <SignatureCanvas 
                penColor='blue'
                ref={(ref: any) => { sigPad = ref }}
                canvasProps={{ width: 325, height: 120, className: styles.signCanvas}}
            />

            <IonRow>
                <IonCol>
                    <IonButton expand="block" onClick={clear}>
                        <IonIcon icon={trashOutline} slot='start' />
                        Limpiar
                    </IonButton>
                </IonCol>
                <IonCol>
                    <IonButton expand="block" onClick={trim} disabled={data.firma ? true : false}>
                        <IonIcon icon={pencilOutline} slot='start' />
                        Firmar
                    </IonButton>
                </IonCol>
            </IonRow>
        </>
    )
}
