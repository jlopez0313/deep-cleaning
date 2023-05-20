import { IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonToolbar, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import Home from '@/components/home/Home';
import styles from './HomePage.module.scss';
import { getUser } from '@/helpers/onboarding';
import { chevronForwardOutline, notificationsOutline, syncOutline } from 'ionicons/icons';
import { useState } from 'react';
import { myJob } from '@/services/visitas';

export const HomePage = () => {

  const {user} = getUser();
  const [visitas, setVisitas] = useState([])
  const [presentAlert] = useIonAlert();

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

  useIonViewWillEnter( () => {
    getVisitas();
  })

  return (
    <IonPage>
      <IonHeader className='layout bg-primary'>
        <IonToolbar color="primary">
          <div className={styles.headerLogo}>
            <img className={` ${styles.logo} ${styles.mx1} ${styles.mt1}`} src='/assets/images/logo-sm-white.png' />
            <span className='text-white'> Deep Quick </span>
          </div>
          
          <IonButtons slot='end'>
            <IonButton type='button'>
              <IonIcon icon={notificationsOutline} className='text-white' />
            </IonButton>
            <IonButton type='button'>
              <IonIcon icon={syncOutline} className='text-white' />
            </IonButton>

          </IonButtons>
        </IonToolbar>

        <IonLabel className={`text-white ${styles.mx2}`} style={{lineHeight: '50px'}}>
          ¡Hola <strong> { user?.name } </strong>!
        </IonLabel>
        
        <IonToolbar class='ion-no-padding' color='primary'>
            <IonItem className={`ion-margin-bottom ${styles.myJob}`} lines='none'>
              <IonLabel color='primary'>
                <strong> Hoy tienes </strong>
              </IonLabel>
              <IonBadge slot="end">
                <IonIcon icon={chevronForwardOutline} />
                {visitas.length} visitas
              </IonBadge>
            </IonItem>
          
        </IonToolbar>


      </IonHeader>

      <IonContent>
        <Home />
      </IonContent>
    </IonPage>
  );
};
