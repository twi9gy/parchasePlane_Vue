import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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
    path: '/reports',
    name: 'reports',
    meta: {
      layout: 'private',
      pageName: 'Отчеты',
      hint: 'Здесь можно посметреть имеющиеся отчеты.'
    },
    component: () => import('../views/Reports')
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router
