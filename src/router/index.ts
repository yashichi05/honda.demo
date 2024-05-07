import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/Manage.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/Order.vue'),
    },
  ],
})

export default router
