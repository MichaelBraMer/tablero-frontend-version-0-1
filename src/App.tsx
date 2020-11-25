import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Creados por mi */
import Login from './pages/public/Login';
import PrivateRouter from './Routes/PrivateRouter';
import store from './store/store';
import socketIO from 'socket.io-client';
import { api } from './config.json';
import { SocketContext } from './SocketContext';
const App: React.FC = () => {

  const socket = socketIO.io(api);

  return (
    <Provider store={store} >
      <SocketContext.Provider value={socket}>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route path="/home" component={PrivateRouter} />
              <Route path="/" component={Login} exact />
              <Redirect to="/" />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </SocketContext.Provider>
    </Provider>
  )
};

export default App;
