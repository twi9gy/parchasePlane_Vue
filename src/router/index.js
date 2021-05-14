import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

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
    path: '/private_office',
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
    component: () => import('../views/DemandForecast/DemandForecasts')
  },
  {
    path: '/demand_forecast/:id',
    name: 'demandForecastShow',
    meta: {
      layout: 'private',
      pageName: 'Отчет о прогнозировании спроса',
      hint: 'Здесь можно посметреть созданный отчет.',
      requiresAuth: true
    },
    component: () => import('../views/DemandForecast/DemandForecast')
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
    component: () => import('../views/DemandForecast/DemandForecastForm')
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
    component: () => import('../views/Plans/Plans')
  },
  {
    path: '/plans/:id',
    name: 'plansShow',
    meta: {
      layout: 'private',
      pageName: 'План закупок',
      hint: 'Здесь можно посметреть созданный план закупок.',
      requiresAuth: true
    },
    component: () => import('../views/Plans/Plan')
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
    component: () => import('../views/Plans/PlansForm')
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
    component: () => import('../views/Category/Categories')
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
    component: () => import('../views/Category/Category')
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// Фильтр для путей. Неавторизованные пользователи не могут перейти на страницы с метапараметром (requiresAuth: true)
router.beforeEach(async (to, from, next) => {
  // Если установлен токен доступа, а пользователь не авторизован
  if (localStorage.getItem('userToken') && !store.getters.getUser.email) {
    store.commit('setLoading', true);
    await store.dispatch('currentUser');
    store.commit('setLoading', false);
  }

  const currentUser = store.getters.getUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Запрет авторизованным пользователям заходить на страницы login, register
  if (currentUser.email && (to.name === 'login' || to.name === 'register')) {
    next('/private_office');
  }

  if (requiresAuth && !currentUser.email) {
    // Если пользователь не авторизован и для доступа к странице необходима авторизация
    next('/login')
  } else {
    next();
    return;
  }
});

export default router
