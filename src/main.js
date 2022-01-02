import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon';
import App from './App.vue';
import router from './router';
import store from './store';
import components from './components';

/* styles block */
import '@/css/normalize.css';

/* style for icons */
import 'vue-awesome/icons';
/* styles block end */

/* register icon component */
Vue.component('v-icon', Icon);

/* register global components */
Object.entries(components).forEach(
  ([, component]) => Vue.component(component.name, component),
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
