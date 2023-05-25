import { BootstrapVueNext } from 'bootstrap-vue-next'

import { createApp } from 'vue'
import Vue3EasyDataTable from 'vue3-easy-data-table'

import 'bootstrap/dist/css/bootstrap.css'

import '@/assets/css/icons.min.css';
import '@/assets/css/bootstrap.min.css';
import '@/assets/css/app.min.css';

import 'vue3-easy-data-table/dist/style.css';
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

import './style.css';

import App from './App.vue'
import router from './router'
import store  from './store';


createApp(App)
    .component('EasyDataTable', Vue3EasyDataTable)
    .use(BootstrapVueNext)
    .use( store )
    .use( router)
    .mount('#layout-wrapper')
