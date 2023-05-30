import { IonContent, IonPage, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import { Visitas } from '@/components/Visitas/Visitas';
import { useContext, useEffect, useState } from 'react';
import UIContext from "@/context/Context";

import { myJob, myVisits } from '@/services/visitas';
import { getUser } from '@/helpers/onboarding';
import { roles } from '@/constants/roles';
import { isUserCleaner, isUserManager } from '@/helpers/roles';

export const VisitasPage = () => {
    const {user} = getUser();

    const { setShowTabs }: any = useContext(UIContext);
    const [presentAlert] = useIonAlert();

    const [visitas, setVisitas] = useState([])

    const getVisitasAdmin = async() => {
        try {
            const lista = await myVisits();
            setVisitas( lista.data )
        } catch(error: any) {
            presentAlert({
                header: 'Alerta!',
                subHeader: 'Mensaje importante.',
                message: error.data?.message || 'Error Interno',
                buttons: ['OK'],
            })
        }
    }

    const getVisitas = async() => {
        try {
            const lista = await myJob();
            setVisitas( lista.data )
        } catch(error: any) {
            presentAlert({
                header: 'Alerta!',
                subHeader: 'Mensaje importante.',
                message: error.data?.message || 'Error Interno',
                buttons: ['OK'],
            })
        }
    }

    useIonViewWillEnter(()=>{
        setShowTabs(true);

        setVisitas([])
        if ( isUserManager() ) {
            getVisitasAdmin();
        } else if ( isUserCleaner() ) {
            getVisitas();
        } else {
            setVisitas([])
        }
    }, [])

    return (
        <IonPage>
            <IonContent className='ion-no-padding' >
                <Visitas visitas={visitas} />
            </IonContent>
        </IonPage>
    );
};