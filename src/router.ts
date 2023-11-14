import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

import independentRoutes, {
  navigationRecords,
  settingsRecords,
  homeRecords,
  dogsRecords,
  forumsRecords,
  transitionRecords
} from "./views";

const UrlCatcher = () =>
  [...new Array(6).keys()].map((key: number) => {
    return {
      path: "/:" + [...new Array(key + 1).keys()].join("/:"),
      component: () => import(`./views/PageNotFound.vue`),
    };
  });

  const nameTransform = (name: string) => (name.startsWith("[") && name.endsWith("]")) ? ":" + name.substring(1, name.length - 1) : name;

let routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/transition/splash",
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
      ...navigationRecords.map(record => {
        return {
          path: "/" + record.name,
          component: () => import(`./views/${record.name}.vue`),
        }
      }),
      ...homeRecords.map(record => {
        return {
          path: "/Home/" + nameTransform(record.name),
          component: () => import(`./views/Home/${record.name}.vue`),
        }
      }),
      ...dogsRecords.map(record => {
        return {
          path: "/Dogs/" + nameTransform(record.name),
          component: () => import(`./views/Dogs/${record.name}.vue`),
        }
      }),
      ...forumsRecords.map(record => {
        return {
          path: "/Forums/" + nameTransform(record.name),
          component: () => import(`./views/Forums/${record.name}.vue`),
        }
      }),
      ...settingsRecords.map(record => {
        return {
          path: "/Settings/" + record.name,
          component: () => import(`./views/Settings/${record.name}.vue`),
        }
      }),
    ]},
  ...independentRoutes.map(record => {
    return {
      path: "/" + record.name,
      component: () => import(`./views/${record.name}.vue`),
    }
  }),
  ...transitionRecords.map(record => {
    return {
      path: "/transition/" + record.name,
      component: () => import(`./views/transition/${record.name}.vue`),
    }
  })
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
