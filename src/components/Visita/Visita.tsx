import React, { Fragment, useEffect, useState } from 'react'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonIcon, IonImg, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonRow, IonSkeletonText, IonThumbnail } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import styles from './Visita.module.scss';
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
        local: {
            local: string;
            foto: string;
            direccion: string;
        },
        checklist: [Servicio]
    };
}

export const Visita = ( {visita}: Props ) => {

    
    const [data, setVisita] = useState( visita );

    const getPhotoUrl = ( foto: string ) => {
        return `${import.meta.env.VITE_BASE_BACK}/${foto}`
    }

    const takePicture = async ( index: number ) => {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Uri,
          // source: CameraSource.Camera
        });
      
        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

        const servicio = data.checklist[ index ]
        servicio.evidencia = image.webPath || '';
        setVisita( {...data, checklist: [...data.checklist]} );

        // Can be set to the src of an image now
        // imageElement.src = imageUrl;
    };

    

    useEffect(() => {
        setVisita(visita)
    }, [visita])

    return (
        <>
            <IonLabel >
                <strong> Basic Information </strong>
            </IonLabel>
            
            <IonCard>
                <IonCardContent>
                    <IonItem class={`ion-no-padding ${styles.visita}`}>
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
                            <IonItem>
                                { service.categoria.categoria }
                            </IonItem>
                            <IonImg src={ service.evidencia } />
                            <IonButton type='button' expand='block' onClick={() => takePicture( idx )}>
                                <IonIcon icon={attachOutline} slot="start" />
                                Attach Evidence
                            </IonButton>
                        </Fragment>
                    )
                })
            }
            </IonList>
        </>
    )
}
