import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

import independentRoutes, {
  navigationRecords,
  settingsRecords,
  forumsRecords,
} from "./views";

const UrlCatcher = () =>
  [...new Array(6).keys()].map((key: number) => {
    return {
      path: "/:" + [...new Array(key + 1).keys()].join("/:"),
      component: () => import(`./views/PageNotFound.vue`),
    };
  });

const nameTransform = (name: string) =>
  name.startsWith("[") && name.endsWith("]")
    ? ":" + name.substring(1, name.length - 1)
    : name;

let routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/splash",
  },
  {
    path: "/",
    component: () => import(`./views/AntiNavigation.vue`),
    children: [
      {
        path: "",
        redirect: "/test",
      },
      ...independentRoutes.map((record) => {
        return {
          path: "/" + record.name,
          component: () => import(`./views/${record.name}.vue`),
        };
      }),
    ],
  },
  ...UrlCatcher(),
  {
    path: "/",
    component: () => import(`./views/Navigation.vue`),
    children: [
      {
        path: "",
        redirect: "/home",
      },
      ...navigationRecords.map((record) => {
        return {
          path: "/" + record.name,
          component: () => import(`./views/${record.name}.vue`),
        };
      }),
      {
        path: "/dogs/:pid",
        component: () => import("./views/Dogs/[pid].vue"),
      },
      {
        path: "/dogs/:pid/:action",
        component: () => import("./views/Dogs/[pid].vue"),
      },
      ...forumsRecords.map((record) => {
        return {
          path: "/Forums/" + nameTransform(record.name),
          component: () => import(`./views/Forums/${record.name}.vue`),
        };
      }),
      ...settingsRecords.map((record) => {
        return {
          path: "/Settings/" + record.name,
          component: () => import(`./views/Settings/${record.name}.vue`),
        };
      }),
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
