import React, { memo, useEffect, useState } from 'react'
import { IonCol, IonImg, IonLabel, IonList, IonRow, IonSearchbar, IonSkeletonText, } from '@ionic/react';
import { IonCard, IonCardContent } from '@ionic/react';
import styles from './Visitas.module.scss';
import { Maps } from '@/components/Maps/Maps';
import { getPhotoUrl } from '@/helpers/photos';

type Props = {
    visitas: [];
}

export const Visitas = memo( ( { visitas }: Props ) => {

    const [ height, setHeight ] = useState({ mapHeight: '50%', listHeight: '50%' })
    const [ markers, setMarkers ] = useState<any>([])

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

    useEffect( () => {
        if(visitas?.length) {
            const markers: any[] = visitas.map( (visita: any) => {
                return visita.local
            })

            setMarkers( markers );
        }
    }, [visitas])

    return (
        <>
            <div style={{height: height.mapHeight}} >
                <Maps height={height.mapHeight} markers={markers}/>
            </div>

            <div style={{height: height.listHeight, overflow: 'scroll'}} onScroll={ (evt) => doScroll( evt ) }>
                {
                    visitas?.length > 0 && <IonSearchbar placeholder="Buscar..." debounce={1000} onIonInput={(ev) => handleInput(ev)}></IonSearchbar>
                }
                <IonList className={styles.visitas}>
                    {
                        !visitas ?
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
                        : visitas.length === 0 ? 
                            <IonCard>
                                <IonCardContent class='card-content-md ion-text-center'>
                                    <IonLabel>
                                        Aún no tienes visitas asignadas para hoy.
                                    </IonLabel>
                                </IonCardContent>
                            </IonCard>
                            : visitas.map( (visita: any, idx) => {
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
})
