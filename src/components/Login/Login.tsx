import { IonLoading, useIonLoading, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonImg } from '@ionic/react';
import { IonInput, IonItem, IonList } from '@ionic/react';
import styles from './Login.module.scss';
import React, { useState } from 'react'
import { login } from '../../services/auth';
import { setUser } from '@/helpers/onboarding';
import { useHistory } from 'react-router-dom'

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [present, dismiss] = useIonLoading();
    const history = useHistory();

    const doLogin = async () => {
        try {
            present({
                message: 'Loading ...',
            });

            const { data } = await login({
                email,
                password,
                device: 'app'
            });
            setUser( data );            
            history.replace('/home')

        } catch(error) {

        } finally {
            dismiss();
        }
    }

    return (
        <div className={styles.layout}>
            <IonGrid class={styles.gridLogin}>
                <IonRow className='ion-justify-content-center ion-align-items-center ion-margin-top'>
                    <IonCol size="11" className="ion-text-center">
                        <IonCard>
                            <IonCardHeader className={styles.bgLogin}>
                                <div className={styles.bgLoginOverlay}></div>
                                <div style={{ position: "relative" }}>
                                    <IonCardTitle class='text-white'>Welcome Back !</IonCardTitle>
                                    <IonCardSubtitle class='text-white-50'>Sign in to continue.</IonCardSubtitle>
                                    <IonImg src='/assets/images/logo-sm-dark.png' style={{height:"70px"}}></IonImg>
                                </div>
                            </IonCardHeader>

                            <IonCardContent>
                                <IonList>
                                    <IonItem>
                                        <IonInput label="Email" type="email" labelPlacement="stacked" placeholder="Enter Email"
                                            onIonInput={(evt: any) => setEmail(evt.target.value)}
                                        ></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput label="Password" type="password" labelPlacement="stacked" placeholder="Enter password"
                                            onIonInput={(evt: any) => setPassword(evt.target.value)}
                                        ></IonInput>
                                    </IonItem>
                                </IonList>
                                    <IonButton className='ion-margin-top' expand="block" onClick={() => doLogin()}> Log In </IonButton>

                                    <IonLoading trigger="open-loading" message="Dismissing after 3 seconds..." duration={3000} />

                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    )
}
