import React from 'react';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import './Participantes.css'
const Participantes: React.FC<{ nombre: String }> = (nombre) => {
    return (
        <IonItem >
            <IonIcon icon={personOutline} slot="start" />
            <IonLabel>{nombre}</IonLabel>
        </IonItem>
    );
};



export default Participantes;
