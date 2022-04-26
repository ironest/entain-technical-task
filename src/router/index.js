import { createRouter, createWebHistory } from 'vue-router';
import RacesView from '../views/RacesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'races',
      component: RacesView,
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    }
  ]
})

export default router;
