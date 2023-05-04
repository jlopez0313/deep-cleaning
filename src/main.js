import { createApp } from 'vue'

import '@/assets/css/icons.min.css';
import '@/assets/css/bootstrap.min.css';
import '@/assets/css/app.min.css';

import App from './App.vue'
import router from './router'

createApp(App)
    .use( router)
    .mount('#layout-wrapper')
