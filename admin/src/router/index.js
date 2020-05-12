import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      // 分类
      { path: '/categories/edit', component: () => import('../views/content/CategoryEdit.vue') },
      { path: '/categories/edit/:id', component: () => import('../views/content/CategoryEdit.vue'), props: true },
      { path: '/categories/list', component: () => import('../views/content/CategoryList.vue') },
      // 物品
      { path: '/items/edit', component: () => import('../views/content/ItemEdit.vue') },
      { path: '/items/edit/:id', component: () => import('../views/content/ItemEdit.vue'), props: true },
      { path: '/items/list', component: () => import('../views/content/ItemList.vue') },
      // 英雄
      { path: '/heroes/edit', component: () => import('../views/content/HeroEdit.vue') },
      { path: '/heroes/edit/:id', component: () => import('../views/content/HeroEdit.vue'), props: true },
      { path: '/heroes/list', component: () => import('../views/content/HeroList.vue') },
      // 文章
      { path: '/articles/edit', component: () => import('../views/content/ArticleEdit.vue') },
      { path: '/articles/edit/:id', component: () => import('../views/content/ArticleEdit.vue'), props: true },
      { path: '/articles/list', component: () => import('../views/content/ArticleList.vue') },
      // 广告
      { path: '/ads/edit', component: () => import('../views/business/AdEdit.vue') },
      { path: '/ads/edit/:id', component: () => import('../views/business/AdEdit.vue'), props: true },
      { path: '/ads/list', component: () => import('../views/business/AdList.vue') },
      // 管理员
      { path: '/admin_users/edit', component: () => import('../views/system/AdminUserEdit.vue') },
      { path: '/admin_users/edit/:id', component: () => import('../views/system/AdminUserEdit.vue'), props: true },
      { path: '/admin_users/list', component: () => import('../views/system/AdminUserList.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
