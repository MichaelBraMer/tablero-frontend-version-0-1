
import React, { useContext } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { nextGame } from '../../../actions/login';
import { SocketContext } from '../../../SocketContext';
import nuncaNunca from '../../../arrayGames/nuncaNunca';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const { jugador, juego } = useSelector((state: any) => state.login)

  const handleClickNext = (e: any) => {
    e.preventDefault();
    dispatch(nextGame(juego.codigo, socket));
  }

  var empezamos;
  if (jugador.id === juego.jugadores[0].id) {
    empezamos = (<IonCard >
      <IonCardHeader>
        <IonCardTitle>¿Empezamos?</IonCardTitle>
      </IonCardHeader>

      <IonCardContent >
        Apreta OK para empezar! <br />
        <IonButton onClick={handleClickNext} >OK</IonButton>
      </IonCardContent>
    </IonCard>)
  } else {
    empezamos = (<IonCard >
      <IonCardHeader>
        <IonCardTitle>Esperando al anfitrion...</IonCardTitle>
      </IonCardHeader>

      <IonCardContent >
        Dile al anfitrion que se apure! <br />
      </IonCardContent>
    </IonCard>)
  }

  var game;

  if (juego.turno === juego.jugadores.map((index: any) => index.id).indexOf(jugador.id) + 1) {
    game = (<IonCard >
      <IonCardHeader>
        <IonCardTitle>Nunca Nunca</IonCardTitle>
      </IonCardHeader>

      <IonCardContent >
        
        {nuncaNunca[juego.juego]} <br />
        <IonButton onClick={handleClickNext} >OK</IonButton>
      </IonCardContent>
    </IonCard>)
  }else{
    game = (<IonCard >
      <IonCardHeader>
        <IonCardTitle>Nunca Nunca</IonCardTitle>
      </IonCardHeader>

      <IonCardContent >
        
        {nuncaNunca[juego.juego]} <br />
      </IonCardContent>
    </IonCard>)
  }

  return (

    <IonPage >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sala: {juego.codigo}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="backgroundOscuro" scrollY={false} fullscreen>
        <IonCard class="background" style={{ height: "95%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {juego.turno === 0 && empezamos}
          {juego.turno !== 0 && game}
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Home;
