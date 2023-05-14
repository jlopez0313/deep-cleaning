import React, { useEffect, useState } from 'react'
import { IonAvatar, IonButton, IonCol, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonSkeletonText, IonText, IonThumbnail, useIonRouter } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import styles from './Visitas.module.scss';
import { Maps } from '@/components/Maps/Maps';

type Props = {
    visitas: [];
}

export const Visitas = ({ visitas }: Props) => {

    const [ height, setHeight ] = useState({ mapHeight: '50%', listHeight: '50%' })
    
    const getPhotoUrl = ( foto: string ) => {
        return foto ? `${import.meta.env.VITE_BASE_BACK}/${foto}` : "https://ionicframework.com/docs/img/demos/card-media.png"
    }

    const handleInput = (ev: Event) => {
        let query = '';
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) 
            query = target.value!.toLowerCase();
    
        // setResults(data.filter((d) => d.toLowerCase().indexOf(query) > -1));
    };

    const doScroll = ( evt: any ) => {
        let heights = {...height}

        if ( evt.target.scrollTop == 0 ) {
            heights = { mapHeight: '50%', listHeight: '50%' }
        } else {
            heights = { mapHeight: '30%', listHeight: '70%' }
        }

        setHeight( heights )
    }

    return (
        <>
            <div style={{height: height.mapHeight}} >
                <Maps height={height.mapHeight}/>
            </div>
            <div style={{height: height.listHeight, overflow: 'scroll'}} onScroll={ (evt) => doScroll( evt ) }>
                <IonSearchbar placeholder="Buscar..." debounce={1000} onIonInput={(ev) => handleInput(ev)}></IonSearchbar>
                <IonList className={styles.visitas}>
                    {
                        visitas.length == 0 ?
                        [1,1,1].map( (_, idx) => {
                            return (
                                <IonCard key={idx}>
                                    <IonCardContent>
                                        <IonRow class='ion-align-items-center'>
                                            <IonCol size='3'>
                                                <IonSkeletonText animated={true} style={{ height: '50px' }}/>
                                            </IonCol>
                                            <IonCol>
                                                <h3>
                                                    <IonSkeletonText animated={true} style={{ width: '50%' }} />
                                                </h3>
                                                <p>
                                                    <IonSkeletonText animated={true} style={{ width: '70%' }} />
                                                </p>
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            )
                        })
                        :
                        visitas.map( (visita: any, idx) => {
                            return (
                                <IonCard key={idx} routerLink={`/visita/${visita.id}`} routerDirection='root'>
                                    <IonCardContent>
                                        <IonRow class='ion-align-items-center'>
                                            <IonCol size='3'>
                                                <IonImg src={ getPhotoUrl( visita.local.foto ) }/>
                                            </IonCol>
                                            <IonCol size='9'>
                                                    <h3>
                                                        <strong> { visita.local.local } </strong>
                                                    </h3>
                                                    <p>
                                                        { visita.local.direccion }
                                                    </p>
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            )
                        })
                    }
                </IonList>
            </div>
        </>
    )
}
