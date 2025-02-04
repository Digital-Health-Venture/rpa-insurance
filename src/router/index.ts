import { createRouter, createWebHistory } from 'vue-router'

import { PATH_HOME, PATH_LOGIN } from '@/constants/paths'

import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { path: PATH_HOME },
    },
    {
      path: PATH_LOGIN,
      name: 'loginView',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: PATH_HOME,
      name: 'homeView',
      component: HomeView,
      // meta: { requiresAuth: true },
    },
  ],
})

export default router
