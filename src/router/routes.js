import authRouter from '../modules/auth/router/';
import dashboardRouter from '../modules/dashboard/router'
import isAuthenticatedGuard from '../modules/auth/router/auth-guard';
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/auth',
    ...authRouter
  },
  {
    path: '/dashboard',
    beforeEnter: [isAuthenticatedGuard],
    ...dashboardRouter
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
