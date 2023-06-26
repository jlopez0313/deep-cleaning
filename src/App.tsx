import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router'
import { HomePage } from '@/pages/Home/HomePage'
import { VisitasPage } from '@/pages/Visitas/VisitasPage'
import { VisitaPage } from '@/pages/Visita/VisitaPage'
import { LoginPage } from '@/pages/Login/LoginPage'
import { EjecucionPage } from '@/pages/Ejecucion/EjecucionPage'
import { DetallePage } from '@/pages/Detalle/DetallePage';

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
import { clipboardOutline, homeOutline, logOutOutline } from 'ionicons/icons';

import { getUser } from './helpers/onboarding';
import UIContext from "./context/Context";
import { useContext } from 'react';

setupIonicReact();

const App: React.FC = () => {

  const { showTabs }: any = useContext(UIContext);  
  const tabBarStyle = showTabs ? undefined : { display: "none" };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          
          <IonRouterOutlet>
            <Route exact={true} path="/home" render={() => <HomePage />} />
            <Route exact={true} path="/visitas" render={() => <VisitasPage />} />
            <Route exact={true} path="/search" render={() => <VisitasPage />} />
            
            <Route path="/visita/:id" component={VisitaPage} />
            <Route path="/ejecucion/:id" component={EjecucionPage} />
            <Route path="/detalle/:id" component={DetallePage} />
            <Route path="/login" component={LoginPage} />

            <Route exact path="/">
                <Redirect to="/login" />
            </Route>

          </IonRouterOutlet>

          <IonTabBar slot="bottom" style={tabBarStyle}>
            <IonTabButton tab="home" href="/home" >
              <IonIcon icon={homeOutline} />
              <IonLabel>Inicio</IonLabel>
            </IonTabButton>

            <IonTabButton tab="visitas" href="/visitas">
              <IonIcon icon={clipboardOutline} />
              <IonLabel>Visitas</IonLabel>
            </IonTabButton>

            <IonTabButton tab="search" href="/login">
              <IonIcon icon={logOutOutline} />
              <IonLabel>Salir</IonLabel>
            </IonTabButton>

          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;