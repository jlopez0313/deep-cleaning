import React, { useEffect, useState } from 'react'
import { IonButton, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonRow, IonSkeletonText } from '@ionic/react';
import styles from './Visita.module.scss';
import { chevronBackOutline } from 'ionicons/icons';
import { Maps } from '@/components/Maps/Maps';
import { Link } from 'react-router-dom'

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
    };
}

export const Visita = ( {visita}: Props ) => {

    const [ data, setVisita ] = useState( visita );
    const [ height, setHeight ] = useState({ mapHeight: '75%', listHeight: '25%' })
    const [ markers, setMarkers ] = useState<any>([])

    const getPhotoUrl = ( foto: string ) => {
        return foto ? `${import.meta.env.VITE_BASE_BACK}/${foto}` : "https://ionicframework.com/docs/img/demos/card-media.png"
    }

    useEffect(() => {
        setVisita(visita)
        if ( visita?.local ) {
            setMarkers([ visita.local ] )
        }
    }, [visita])

    return (
        <>
            <div style={{height: height.mapHeight, position: 'relative'}} >
                <Maps height={height.mapHeight} markers={markers}/>
                <Link to='/visitas'>
                    <IonButton className={styles.backButton}>
                        <IonIcon icon={chevronBackOutline} />
                    </IonButton>
                </Link>
            </div>
                
            {
                data?.local ?
                    <IonGrid className={styles.visita}>
                        <IonRow class='ion-align-items-center'>
                            <IonCol size='3'>
                                <IonImg src={ getPhotoUrl( visita.local.foto ) }/>
                            </IonCol>
                            <IonCol size='9'>
                                <h4 className='ion-no-margin ion-margin-top'>

                                    <strong> { visita.local.local } </strong>
                                </h4>
                                <IonLabel>
                                    { visita.local.direccion }
                                </IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel> Horario desde: </IonLabel>
                            </IonCol>
                            <IonCol>
                                <IonLabel> Horario hasta: </IonLabel>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol> <IonLabel> {visita.start_date} </IonLabel> </IonCol>
                            <IonCol> <IonLabel> {visita.end_date} </IonLabel> </IonCol>
                        </IonRow>
                    </IonGrid>
                :
                    <IonRow class='ion-align-items-center'>
                        <IonCol size='3'>
                            <IonSkeletonText animated={true} style={{ height: '50px' }}/>
                        </IonCol>
                        <IonCol>
                            <h3 className='ion-no-margin ion-margin-top'>
                                <IonSkeletonText animated={true} style={{ width: '50%' }} />
                            </h3>
                            <p className='ion-no-margin'>
                                <IonSkeletonText animated={true} style={{ width: '70%' }} />
                            </p>
                        </IonCol>
                    </IonRow>
            }
        </>
    )
}
