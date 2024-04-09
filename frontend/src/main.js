import { createApp } from 'vue';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import App from './App.vue';
import router from './router';


createApp(App).use(router).mount('#app');
