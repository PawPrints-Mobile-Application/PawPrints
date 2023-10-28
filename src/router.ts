import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import {
  navigationRoutes,
  // templateRoutes,
  transitionRoutes,
  routes as viewsRoutes,
} from "./views";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/landingpage",
  },
];

const router = () => {
  routes.push({
    path: "/",
    component: () => import("./views/Navigation.vue"),
    children: navigationRoutes,
  });
  viewsRoutes.forEach(route => routes.push(route));
  transitionRoutes.forEach(route => routes.push(route));

  // templateRoutes.forEach(route => routes.push(route));

  return createRouter({
    // Use: createWebHistory(process.env.BASE_URL) in your app
    history: createWebHistory(),
    routes,
  });
};

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
export default router();
