import React from 'react'
import { IonContent, IonFooter, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { Login } from '@/components/Login/Login';
import UIContext from "@/context/Context";
import { useContext, useEffect } from 'react';
import styles from './Login.module.scss';

export const LoginPage = () => {
  const { setShowTabs }: any = useContext(UIContext);

  useEffect(() => {
    setShowTabs(false);

    return () => {
        setShowTabs(true);
    };
}, [])

  return (
    <IonPage>
      <IonContent fullscreen={true} class='ion-no-padding' className={styles.layout}>
        <Login />
      </IonContent>
    </IonPage>
  )
}
