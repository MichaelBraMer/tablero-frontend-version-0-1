import React, { useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonFooter, IonInput, IonRow, IonCol } from '@ionic/react';
import './Chat.css';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../../SocketContext'
import { enviarMsj } from '../../../actions/login';
import { useForm } from '../../../hooks/useForm';

const Chat: React.FC = () => {

  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const { jugador, juego } = useSelector((state: any) => state.login);

  const [values, handleInputChange, reset]: any = useForm({
    mensaje: ""
  });
  const { mensaje } = values;

  const enviarMensaje = (e: any) => {
    e.preventDefault();
    dispatch(enviarMsj(juego.codigo, jugador.nombre, mensaje, socket));
    reset();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          juego.mensajes.map((mensaje: any, i: number) => (
            <div>{mensaje.mensaje}</div>
          ))
        }
      </IonContent>
      <IonFooter>
        <IonRow>
          <IonCol>
            <form onSubmit={enviarMensaje}>
              <IonInput type="text" name="mensaje" value={mensaje} autoCorrect={'on'} autofocus={true} placeholder="Escribe un mensaje aquí" onIonChange={handleInputChange}> <IonButton type="submit">Enviar</IonButton></IonInput>
            </form>
          </IonCol>
        </IonRow>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;
