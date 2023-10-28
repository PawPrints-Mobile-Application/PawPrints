import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { Navigation } from './layout/index';
import { NavPages, HiddenPages } from './views';

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
  NavPages.forEach(page => routes[1].children?.push({ path: page.path, component: () => import(`./views/NavPages/${page.name}.vue`)}));

  HiddenPages.forEach(page => routes.push({ path: page.path, component: () => import(`./views/HiddenPages/${page.name}.vue`)}))

  console.log(routes);

  return createRouter({
    // Use: createWebHistory(process.env.BASE_URL) in your app
    history: createWebHistory(),
    routes,
  });
}

const router = addRoutes();

// router.beforeEach(async (to, from, next) => {
//   from;
//   const currentUser = await getCurrentUser();
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (currentUser) {
//       next();
//     }
//     else {
//       alert('Please Login first to access the page!');
//       next('/login')
//     }
//   }
//   else if (to.path === '/login'){
//     if (currentUser) {
//       next('/home');
//     }
//     else {
//       next();
//     }
//   }
//   else{
//     next();
//   }
// });
export default router;