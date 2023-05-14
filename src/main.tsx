import React from 'react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { createRoot } from 'react-dom/client';
import { UIProvider } from "./context/Context";
import App from './App';

import './styles.scss';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <UIProvider>
    <App />
  </UIProvider>
);

// defineCustomElements(window);
