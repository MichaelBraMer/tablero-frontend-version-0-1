import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { IonRow, IonCol, IonInput, IonItem, IonPage, IonCard, IonCardContent, IonContent, IonButton, IonGrid, IonImg, IonLoading, IonAlert } from '@ionic/react';
import './Login.css';
import { useForm } from '../../hooks/useForm';
import { closeAlert, createGame, joinJuego } from '../../actions/login';
import { SocketContext } from '../../SocketContext';

const Login: React.FC = ({ history }: any) => {

    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const { reciveGame, errorGame, errorMessage } = useSelector((state: any) => state.login);


    const [values, handleInputChange]: any = useForm({
        anfitrion: "",
        codigo: ""
    });

    const { anfitrion, codigo } = values;

    const crearPartida = (e: any) => {
        e.preventDefault();
        dispatch(createGame(anfitrion, socket));
        if (anfitrion.length > 3) {
            history.replace('/home/principal');
        }
    }

    const joinGame = (e: any) => {
        e.preventDefault();
        dispatch(joinJuego(anfitrion, codigo, socket))
        if (anfitrion.length > 3 && codigo.length === 4) {
            history.replace('/home/principal');
        }
    }

    return (
        <IonPage>
            <IonContent class="backgroundColor">
                <IonImg src="./assets/titulos/letras-portada.png" />
                <div style={{ paddingLeft: '15%', paddingRight: '15%' }}>
                    <IonCard class="cardtransparent">
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonItem lines="full">
                                            <IonInput disabled={reciveGame} placeholder="Ingrese su nombre..." name="anfitrion" value={anfitrion} onIonChange={handleInputChange} />
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonButton disabled={reciveGame} expand="block" onClick={crearPartida}> Crear Partida</IonButton>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonInput disabled={reciveGame} placeholder="Ingrese el código de la sala..." name="codigo" value={codigo} onIonChange={handleInputChange} />
                                        </IonItem>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton disabled={reciveGame} fill="solid" expand="block" type="submit" onClick={joinGame}>Unirse</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                </div>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={reciveGame}
                    message={'Espere porfavor...'}
                    duration={1000}
                />
                <IonAlert
                    cssClass='my-custom-class'
                    onDidDismiss={() => dispatch(closeAlert())}
                    isOpen={errorGame}
                    message={errorMessage}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage >
    )
}

export default Login;
