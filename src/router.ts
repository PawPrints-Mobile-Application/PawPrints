import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { Navigation } from './components/index';
import { hiddenPages, navPages } from './views';

var routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/login',
  },
  {
    path: '/',
    component: Navigation,
    children: [
      {
        path: '',
        redirect: '/home',
      }
    ],
  },
];

const addRoutes = () => {
  navPages.forEach((navPage) => routes[1].children?.push({ path: navPage.name, component: () => import(`./views/${navPage.name}.vue`)}));

  hiddenPages.forEach(hiddenPage => routes.push({ path: hiddenPage.path, component: () => import(`./views/${hiddenPage.name}.vue`)}))

  return createRouter({
    // Use: createWebHistory(process.env.BASE_URL) in your app
    history: createWebHistory(),
    routes,
  });
}

const router = addRoutes();

export default router;