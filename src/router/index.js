import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('../views/Contacts')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register')
  },
  {
    path: '/secure',
    name: 'secure',
    component: () => import('../views/Secure'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/privateOffice',
    name: 'privateOffice',
    meta: {
      layout: 'private',
      pageName: 'Личный кабинет',
      hint: 'Здесь можно изменить информацию о вашем профиле.'
    },
    component: () => import('../views/PrivateOffice')
  },
  {
    path: '/demandForecast',
    name: 'demandForecast',
    meta: {
      layout: 'private',
      pageName: 'Отчеты о прогнозировании спроса',
      hint: 'Здесь можно посметреть имеющиеся отчеты.'
    },
    component: () => import('../views/DemandForecast')
  },
  {
    path: '/plans',
    name: 'plans',
    meta: {
      layout: 'private',
      pageName: 'Планы закупок',
      hint: 'Здесь можно посметреть имеющиеся планы закупок.'
    },
    component: () => import('../views/Plans')
  },
  {
    path: '/report/create',
    name: 'reportCreate',
    meta: {
      layout: 'private',
      pageName: 'Создание отчета',
      hint: 'Здесь можно создать новый отчет.'
    },
    component: () => import('../views/ReportCreate')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'private',
      pageName: 'Каталог',
      hint: 'Здесь можно посметреть имеющиеся категории.'
    },
    component: () => import('../views/Categories')
  },
  {
    path: '/:id/category',
    name: 'category',
    meta: {
      layout: 'private',
      pageName: 'Категория: ',
      hint: 'Здесь храняться файлы категории.'
    },
    component: () => import('../views/Category')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/Error')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
