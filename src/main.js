import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon';
import Paginate from 'vuejs-paginate';
import VModal from 'vue-js-modal';
import App from './App.vue';
import router from './router';
import store from './store';
import components from './components';

/* styles block */
import '@/css/normalize.css';

/* style for icons */
import 'vue-awesome/icons';
/* styles block end */

/* register plugins */
Vue.use(VModal, {
  dynamic: true,
  dynamicDefault: { adaptive: true },
});

/* manual register components */
Vue.component('paginate', Paginate);
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
