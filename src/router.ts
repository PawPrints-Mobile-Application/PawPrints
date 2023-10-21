import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { Navigation } from "./layout/index";
import pages from "./views";

var routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/landingpage",
  },
  {
    path: "/",
    component: Navigation,
    children: [
      {
        path: "",
        redirect: "/home",
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
];

const addRoutes = () => {
  pages.forEach((page) => {
    const isNavigation = page.path.indexOf("NavPages") !== -1;
    const target = isNavigation ? routes[1].children! : routes;
    target.push({
      path: page.path,
      component: () => import(page.filename /* @vite-ignore */),
    });
  });

  return createRouter({
    // Use: createWebHistory(process.env.BASE_URL) in your app
    history: createWebHistory(),
    routes,
  });
};

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
