import { IonAlert } from '@ionic/react';
import React from 'react'

type Props = {
  message: string,
  present: string,
  onButtonClick: (clicked: boolean) => void
  onDismiss? : (data: any) => void
}

export const AlertConfirm = ({ message, present, onButtonClick, onDismiss }: Props) => {
  return (
    <IonAlert
        header="Alerta!"
        subHeader= 'Mensaje Importante'
        message= {message}
        trigger={present}
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              onButtonClick(false);
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              onButtonClick(true);
            },
          },
        ]}
        onDidDismiss={ ({ detail }) => onDismiss && onDismiss(detail)}
    ></IonAlert>
  )
}
