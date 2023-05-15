import React from 'react'
import { useParams } from 'react-router';
import { IonButtons, IonContent, IonFooter, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Login } from '@/components/Login/Login';
import UIContext from "@/context/Context";
import { useContext, useEffect, useState } from 'react';

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
      <IonContent>
        <Login />
      </IonContent>
      <IonFooter>
        <IonToolbar class='ion-text-center'>
            © 2023.
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}
