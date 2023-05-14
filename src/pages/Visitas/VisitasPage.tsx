import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import styles from './Visitas.module.scss';
import { Visitas } from '@/components/Visitas/Visitas';
import { useContext, useEffect, useState } from 'react';

import { myJob } from '@/services/visitas';

export const VisitasPage = () => {

    const [visitas, setVisitas] = useState([])

    const getVisitas = async() => {
        const lista = await myJob();
        setVisitas( lista.data )
    }

    useIonViewWillEnter(()=>{
        getVisitas()
    }, [])

    return (
        <IonPage>
            <IonContent className='ion-no-padding' >
                <Visitas visitas={visitas} />
            </IonContent>
        </IonPage>
    );
};