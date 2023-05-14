import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonLabel, IonListHeader, IonMenuButton, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import Home from '@/components/home/Home';
import styles from './HomePage.module.scss';
import { getUser } from '@/helpers/onboarding';
import { notificationsOutline, syncOutline } from 'ionicons/icons';

const HomePage: React.FC = () => {

  const {user} = getUser();

  return (
    <IonPage>
      <IonHeader className='layout'>
        <IonToolbar color="primary">
          <IonImg className={`${styles.mx1} ${styles.mt1}`} src='/assets/images/logo-sm-dark.png' style={{height: '50px', width: '50px'}} />
          
          <IonButtons slot='end'>
            <IonButton>
              <IonIcon icon={notificationsOutline} className='text-white' />
            </IonButton>
            <IonButton>
              <IonIcon icon={syncOutline} className='text-white' />
            </IonButton>

          </IonButtons>
        </IonToolbar>

        <IonToolbar className='ion-padding-start' color='primary'>
            <IonLabel className='text-white'>
              ¡Hola <strong> { user?.name } </strong>!
            </IonLabel>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Home />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
