import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router'
import HomePage from '@/pages/Home/HomePage'
import { VisitasPage } from '@/pages/Visitas/VisitasPage'
import { VisitaPage } from '@/pages/Visita/VisitaPage'
import { LoginPage } from '@/pages/Login/LoginPage'
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
import { clipboardOutline, ellipsisHorizontalOutline, homeOutline } from 'ionicons/icons';

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
            <Route path="/login" component={LoginPage} />
            <Route exact path="/">
                <Redirect to="/home" />
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
              <IonIcon icon={ellipsisHorizontalOutline} />
              <IonLabel>Más</IonLabel>
            </IonTabButton>

          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
