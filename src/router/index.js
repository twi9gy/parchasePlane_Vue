import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "vue-cli-plugin-mdb/generator/templates/newApp/src/store";

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
    path: '/privateOffice',
    name: 'privateOffice',
    meta: {
      layout: 'private',
      pageName: 'Личный кабинет',
      hint: 'Здесь можно изменить информацию о вашем профиле.',
      requiresAuth: true
    },
    component: () => import('../views/PrivateOffice')
  },
  {
    path: '/demand_forecast',
    name: 'demandForecast',
    meta: {
      layout: 'private',
      pageName: 'Отчеты о прогнозировании спроса',
      hint: 'Здесь можно посметреть имеющиеся отчеты.',
      requiresAuth: true
    },
    component: () => import('../views/DemandForecast')
  },
  {
    path: '/demand_forecast/create',
    name: 'demandForecastCreate',
    meta: {
      layout: 'private',
      pageName: 'Создание отчета о прогнозировании спроса',
      hint: 'Здесь можно создать новый отчет о прогнозировании спроса.',
      requiresAuth: true
    },
    component: () => import('../views/DemandForecastForm')
  },
  {
    path: '/plans',
    name: 'plans',
    meta: {
      layout: 'private',
      pageName: 'Планы закупок',
      hint: 'Здесь можно посметреть имеющиеся планы закупок.',
      requiresAuth: true
    },
    component: () => import('../views/Plans')
  },
  {
    path: '/plans/create',
    name: 'plans_create',
    meta: {
      layout: 'private',
      pageName: 'Создание плана закупок',
      hint: 'Здесь можно создать новый план закупок.',
      requiresAuth: true
    },
    component: () => import('../views/PlansForm')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'private',
      pageName: 'Каталог',
      hint: 'Здесь можно посметреть имеющиеся категории.',
      requiresAuth: true
    },
    component: () => import('../views/Categories')
  },
  {
    path: '/category/:id',
    name: 'category',
    meta: {
      layout: 'private',
      pageName: 'Категория: ',
      hint: 'Здесь храняться файлы категории.',
      requiresAuth: true
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

// Фильтр для путей. Не авторизованные пользователи не могут перейти на страницы с метапараметром (requiresAuth: true)
router.beforeEach((to, from, next) => {
  // Проверяем авторизован ли пользователь.
  let LoggedIN = ((typeof localStorage.getItem('userToken') !== 'undefined' && localStorage.getItem('userToken') !== null) ||
      (typeof store.getters.getUser !== 'undefined' && store.getters.getUser !== null));

  if (LoggedIN) {
    // Если пользователь авторизован
    if (to.name === 'login' || to.name === 'register') {
      // Если пользователь авторизован и хочет попасть в login или register
      next('/')
    }
    next();
  } else {
    // Если пользователь не авторизован
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // Если для route нужна авторизация
      next('/login');
    }
    next();
  }
});

export default router
