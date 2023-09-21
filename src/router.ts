import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { Tab, routes as routesList } from './components/index.ts';

var routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: Tab,
    children: [
      {
        path: '',
        redirect: '/home',
      }
    ],
  },
];

const addRoutes = () => {
  routesList.forEach((route) => routes[1].children?.push({ path: route.name, component: () => import(`./pages/${route.name}Page.vue`)}));

  return createRouter({
    // Use: createWebHistory(process.env.BASE_URL) in your app
    history: createWebHistory(),
    routes,
  });
}

const router = addRoutes();

export default router;