import React, { Fragment, useEffect, useState } from 'react'
import { IonButton, IonCard, IonCardContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonSkeletonText, IonThumbnail } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import styles from './Ejecucion.module.scss';
import { attachOutline } from 'ionicons/icons';

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
        start_date: '',
        end_date: '',
        local: {
            local: string;
            foto: string;
            direccion: string;
        },
        checklist: [Servicio]
    },
    onFinished: ( visita: any) => void,
}

export const Ejecucion = ( {visita, onFinished}: Props ) => {
   
    const [data, setVisita] = useState( visita );

    const getPhotoUrl = ( foto: string ) => {
        return `${import.meta.env.VITE_BASE_BACK}/${foto}`
    }

    const takePicture = async ( index: number ) => {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera
        });

        const servicio = data.checklist[ index ]
        servicio.evidencia = 'data:image/jpeg;base64,' + image.base64String || '';
        setVisita( {...data, checklist: [...data.checklist]} );

        hasFinished()

        // Can be set to the src of an image now
        // imageElement.src = imageUrl;
    };

    const hasFinished = () => {
        const finished = visita.checklist.every( item => item.evidencia );
        if ( finished) {
            onFinished( visita )
        }
    }

    useEffect(() => {
        setVisita(visita)
    }, [visita])

    return (
        <>
            <IonLabel >
                <strong> Basic Information </strong>
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

            <IonList>
            {
                data?.checklist?.map( (service, idx) => {
                    return (
                        <Fragment key={idx}>
                            <IonItem lines='none'>
                                <strong> { service.categoria.categoria } </strong>
                            </IonItem>
                            {
                                service.evidencia && <IonImg src={ service.evidencia } />
                            }
                            <IonButton type='button' expand='block' onClick={() => takePicture( idx )}>
                                <IonIcon icon={attachOutline} slot="start" />
                                Evidencia
                            </IonButton>
                        </Fragment>
                    )
                })
            }
            </IonList>
        </>
    )
}
