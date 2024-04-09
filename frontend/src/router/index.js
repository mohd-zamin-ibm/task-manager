import { createRouter, createWebHistory } from 'vue-router';
import About from '../views/About';
import Home from '../views/Home';
import Login from '../views/Login';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    return { name: 'Login' };
  }
});

export default router;
