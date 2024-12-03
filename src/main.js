import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js';
import FontAwesomeIcon from './icons/index.js';
import store from './stores/index.js';
import TheLoading from './components/UI/TheLoading.vue';
import axios from 'axios';
window.axios = axios;
const app = createApp(App);
app.use(store);
app.use(router);
app.component('FontAwesomeIcon',FontAwesomeIcon);
app.component('TheLoading',TheLoading);
app.mount('#app');