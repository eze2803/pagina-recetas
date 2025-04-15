import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import InicioView from '@/views/InicioView.vue'
import LoginView from '@/views/LoginView.vue'
import FavoritosView from '@/views/FavoritosView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Inicio',
    component: InicioView
  },
  {
    path: '/favoritos',
    name: 'favoritos',
    component: FavoritosView,
    meta: { requiresAuth: true, }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
