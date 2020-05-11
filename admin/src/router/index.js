import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/categories/edit',
        name: 'CategoryEdit',
        component: () => import('../views/CategoryEdit.vue')
      },
      {
        path: '/categories/edit/:id',
        component: () => import('../views/CategoryEdit.vue'),
        props: true
      },
      {
        path: '/categories/list',
        name: 'CategoryList',
        component: () => import('../views/CategoryList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
