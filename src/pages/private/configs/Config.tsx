import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonCol, IonRow } from '@ionic/react';
import { useSelector } from 'react-redux';
import { beerOutline, personOutline } from 'ionicons/icons';
import './Config.css';
const Config: React.FC = () => {

  const { juego, jugador } = useSelector((state: any) => state.login);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configuración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Participantes</IonCardTitle>
          </IonCardHeader>
          {
            juego.jugadores.map((player: any, i: number) => (<IonItem key={player.id} >
              <IonIcon icon={i === 0 ? beerOutline : personOutline} slot="start" />
              <IonLabel>{jugador.nombre ===player.nombre ? player.nombre + ' Tú': player.nombre}</IonLabel>
            </IonItem>))
          }

        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Idioma</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton expand="block">Español</IonButton>
          </IonCardContent>
        </IonCard>

        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Música</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonButton expand="block">Si</IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Efectos</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonButton expand="block">Si</IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Config;
