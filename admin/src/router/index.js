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
        component: () => import('../views/content/CategoryEdit.vue')
      },
      {
        path: '/categories/edit/:id',
        component: () => import('../views/content/CategoryEdit.vue'),
        props: true
      },
      {
        path: '/categories/list',
        name: 'CategoryList',
        component: () => import('../views/content/CategoryList.vue')
      },
      {
        path: '/items/edit',
        name: 'ItemEdit',
        component: () => import('../views/content/ItemEdit.vue')
      },
      {
        path: '/items/edit/:id',
        component: () => import('../views/content/ItemEdit.vue'),
        props: true
      },
      {
        path: '/items/list',
        name: 'ItemList',
        component: () => import('../views/content/ItemList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
