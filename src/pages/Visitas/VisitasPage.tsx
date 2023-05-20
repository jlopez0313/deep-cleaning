import { IonContent, IonPage, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import { Visitas } from '@/components/Visitas/Visitas';
import { useContext, useEffect, useState } from 'react';
import UIContext from "@/context/Context";

import { myJob } from '@/services/visitas';

export const VisitasPage = () => {
    const { setShowTabs }: any = useContext(UIContext);
    const [presentAlert] = useIonAlert();

    const [visitas, setVisitas] = useState(null)

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

        setVisitas(null)
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