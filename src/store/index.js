import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import catalog from './modules/catalog/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    catalog,
  },
  plugins: [createPersistedState()],
});
