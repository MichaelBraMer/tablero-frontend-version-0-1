
import React, { useContext, useEffect } from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { beer, chatbox, settings } from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import Chat from '../pages/private/chat/Chat';
import Config from '../pages/private/configs/Config';
import Home from '../pages/private/home/Home';
import VerificationRouter from './VerificationRoute';
import { SocketContext } from '../SocketContext';
import { useDispatch } from 'react-redux';
import { refrescarJuego } from '../actions/login';
// import socketIOClient from "socket.io-client";
// import { api } from '../config.json'
// import { useSelector } from 'react-redux';

const PrivateRouter: React.FC = () => {

    // const state = useSelector((state: any) => state.login)

    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('listaJugadores', (juego: any) => {
            dispatch(refrescarJuego(juego));
        })
        socket.on('listaMensajes', (juego: any) => {
            dispatch(refrescarJuego(juego));
        })
        socket.on('continuarJuego', (juego: any) => {
            dispatch(refrescarJuego(juego));
        })
    }, [dispatch, socket]);

    return (
        <>

            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/home/:tab(principal)" component={true ? Home : VerificationRouter} />
                    <Route path="/home/:tab(chat)" component={true ? Chat : VerificationRouter} />
                    <Route path="/home/:tab(config)" component={true ? Config : VerificationRouter} />
                    <Redirect to="/home/principal" />
                </IonRouterOutlet>

                <IonTabBar slot="bottom">

                    <IonTabButton tab="home" href="/home/principal">
                        <IonIcon icon={beer} />
                        <IonLabel>Juego</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="chat" href="/home/chat">
                        <IonIcon icon={chatbox} />
                        <IonLabel>Chat</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="config" href="/home/config">
                        <IonIcon icon={settings} />
                        <IonLabel>Config</IonLabel>
                    </IonTabButton>

                </IonTabBar>
            </IonTabs>
        </>
    )
}

export default PrivateRouter;