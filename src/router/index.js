import Vue from 'vue';
import VueRouter from 'vue-router';
import CatalogList from '../views/List.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'List',
    component: CatalogList,
  },
  {
    path: '/product/:id',
    name: 'Item',
    component: () => import(/* webpackChunkName: "item" */ '../views/Item.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const DEFAULT_TITLE = 'Catalog';

router.afterEach((to/* , from */) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
