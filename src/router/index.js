import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/privateOffice',
    name: 'privateOffice',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/PrivateOffice')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/Register')
  },
  {
    path: '/secure',
    name: 'secure',
    component: () => import('../views/Secure'),
    meta: {
      requiresAuth: true,
      layout: 'main'
    }
  },
  {
    // Может быть report-layout
    path: '/:id/category',
    name: 'category',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/Category')
  },
  {
    path: '/report/create',
    name: 'reportCreate',
    meta: {
      layout: 'report'
    },
    component: () => import('../views/ReportCreate')
  },
  {
    path: '*',
    name: '404',
    meta: {
      layout: 'main'
    },
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
