import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import InicioView from '@/views/InicioView.vue'
import RecetasView from '@/views/RecetasView.vue'
import LoginView from '@/views/LoginView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Inicio',
    component: InicioView
  },
  {
    path: '/recetas',
    name: 'Recetas',
    component: RecetasView,
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
