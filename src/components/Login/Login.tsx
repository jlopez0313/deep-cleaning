import { IonLoading, useIonLoading, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonImg, useIonAlert, IonGrid, IonRow, IonCol } from '@ionic/react';
import { IonInput, IonItem, IonList } from '@ionic/react';
import styles from './Login.module.scss';
import React, { useEffect, useState } from 'react'
import { login } from '@/services/auth';
import { setUser, clearUser } from '@/helpers/onboarding';
import { useHistory } from 'react-router-dom'

export const Login = () => {

    const [presentAlert] = useIonAlert();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [present, dismiss] = useIonLoading();
    const history = useHistory();

    const doLogin = async (evt: any) => {
        evt.preventDefault();

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

        } catch(error: any) {
            presentAlert({
                header: 'Alerta!',
                subHeader: 'Mensaje importante.',
                message: error.data?.message || 'Error Interno',
                buttons: ['OK'],
            })
        } finally {
            dismiss();
        }
    }

    useEffect(() => {
        clearUser()
    }, [])

    return (
        <IonGrid class="ion-text-center">
            <IonRow>
                <IonCol size="12" class='ion-no-padding'>
                    <IonCard class={`ion-no-padding ${styles.gridLogin}`}>

                            <IonCardHeader className={`ion-no-padding ion-text-center ${styles.bgLogin}`}>
                                <IonImg className='ion-no-margin' src='/assets/images/logo-sm-white.png' style={{height:"100px"}}></IonImg>
                                <IonCardTitle class='ion-margin-vertical text-white'>
                                    <strong> Deep Quick </strong>
                                </IonCardTitle>
                                
                            </IonCardHeader>

                            <IonCardContent>
                                <IonList>
                                    <IonItem className='ion-no-padding ion-margin-bottom ' lines='none'>
                                        <IonInput type="email" labelPlacement="stacked" placeholder="Correo"
                                            onIonInput={(evt: any) => setEmail(evt.target.value)}
                                        ></IonInput>
                                    </IonItem>
                                    <IonItem className='ion-no-padding' lines='none'>
                                        <IonInput type="password" labelPlacement="stacked" placeholder="Contraseña"
                                            onIonInput={(evt: any) => setPassword(evt.target.value)}
                                        ></IonInput>
                                    </IonItem>
                                </IonList>
                                    <IonButton
                                        color="dark" 
                                        type='button'
                                        className='ion-margin-top'
                                        expand="block"
                                        disabled={ !email || !password }
                                        onClick={(evt) => doLogin(evt)}
                                    > Iniciar Sesión </IonButton>

                                    <IonLoading trigger="open-loading" message="Dismissing after 3 seconds..." duration={3000} />

                            </IonCardContent>
                        </IonCard>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}
