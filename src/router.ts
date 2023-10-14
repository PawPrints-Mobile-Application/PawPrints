import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { Navigation } from './components/index';
import { hiddenPages, navPages } from './views';
import {getCurrentUser} from './server/firebase';

var routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/landingpage',
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
    meta: {
      requiresAuth: true
    }
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

router.beforeEach(async (to, from, next) => {
  from;
  const currentUser = await getCurrentUser();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (currentUser) {
      next();
    }
    else {
      alert('Please Login first to access the page!');
      next('/login')
    }
  }
  else if (to.path === '/login'){
    if (currentUser) {
      next('/home');
    }
    else {
      next();
    }
  }
  else{
    next();
  }
})


export default router;