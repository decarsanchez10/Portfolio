const routes = [
  {
    path: '/',
    component: () => import('../components/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/IndexPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

export default routes