import { IonItem, IonList, IonListHeader, IonText } from '@ionic/react'
import styles from './Notificaciones.module.scss'

export const Notificaciones = () => {
  return (
    <IonList class='ion-no-padding'>
        <IonListHeader> Notificaciones </IonListHeader>
        <IonItem>
            <IonText> 1. Notificacion 1 </IonText>
        </IonItem>
        <IonItem>
            <IonText> 2. Notificacion 2 </IonText>
        </IonItem>
        <IonItem lines='none'>
            <IonText> 3. Notificacion 3 </IonText>
        </IonItem>
    </IonList>
  )
}
