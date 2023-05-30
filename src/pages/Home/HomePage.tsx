import { IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonPopover, IonToolbar, useIonAlert, useIonLoading, useIonViewWillEnter } from '@ionic/react';
import Home from '@/components/home/Home';
import styles from './HomePage.module.scss';
import { getUser } from '@/helpers/onboarding';
import { chevronForwardOutline, notificationsOutline, syncOutline } from 'ionicons/icons';
import { useState } from 'react';
import { myJob, myVisits } from '@/services/visitas';
import { isUserManager, isUserCleaner } from '@/helpers/roles';
import { Notificaciones } from '@/components/Notificaciones/Notificaciones';

export const HomePage = () => {

  const {user} = getUser();
  const [visitas, setVisitas] = useState([])
  const [presentAlert] = useIonAlert();
  const [present, dismiss] = useIonLoading();


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

  const doRefresh = async () => {
    await present({
        message: 'Loading...',
    });
    
    await onGetVisitas();
    dismiss();
  }

  const onGetVisitas = async () => {
    if ( isUserManager() ) {
      await getVisitasAdmin();
    } else if ( isUserCleaner() ) {
      await getVisitas();
    } else {
      await setVisitas([])
    }

    return ;
  }

  useIonViewWillEnter( () => {
    onGetVisitas();
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
            
            <IonButton id="click-trigger" type='button'>
              <IonIcon icon={notificationsOutline} className='text-white' />
            </IonButton>
            
            <IonPopover trigger="click-trigger" triggerAction="click">
              <IonContent class="ion-padding">
                <Notificaciones />
              </IonContent>
            </IonPopover>

            <IonButton type='button' onClick={doRefresh}>
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
