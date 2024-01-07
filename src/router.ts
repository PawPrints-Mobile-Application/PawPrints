import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const UrlCatcher = () =>
  [...new Array(6).keys()].map((key: number) => {
    return {
      path: "/:" + [...new Array(key + 1).keys()].join("/:"),
      component: () => import(`./views/PageNotFound.vue`),
    };
  });

let routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/splash",
  },
  {
    path: "/test",
    name: "test",
    component: () => import(`./views/Test.vue`),
  },
  {
    path: "/splash",
    name: "splash",
    component: () => import(`./views/Splash.vue`),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import(`./views/Auth.vue`),
  },
  ...UrlCatcher(),
  {
    path: "/",
    component: () => import("./views/navigation/Navigation.vue"),
    children: [
      {
        path: "/",
        redirect: "/home",
      },
      {
        path: "/home",
        name: "home",
        component: () => import(`./views/navigation/Home.vue`),
      },
      {
        path: "/forums",
        name: "forums",
        component: () => import(`./views/navigation/Forums.vue`),
      },
      {
        path: "/dogs",
        name: "dogs",
        component: () => import(`./views/navigation/Dogs.vue`),
      },
      {
        path: "/map",
        name: "map",
        component: () => import(`./views/navigation/Map.vue`),
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import(`./views/navigation/Settings.vue`),
      },
      {
        path: "/dogs/:pid",
        name: "dog profile",
        component: () => import(`./views/dynamic/[pid].vue`),
      },
    ],
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

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
