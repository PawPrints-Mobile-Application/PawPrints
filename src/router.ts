import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

type ParentRouteRecord = {
  name: string;
  component?: string;
  default?: string;
  children?: ParentRouteRecord[];
};

const ComponentPath = (name: string): string =>
  `${name.startsWith(":") ? `[${name.substring(1)}]` : name}`;

const ProcessArrayRouteRecord = (
  record: Array<ParentRouteRecord>,
  parentPath: string = "",
  componentPath: string = ""
) =>
  record
    .map((rec) => ProcessParentRouteRecord(rec, parentPath, componentPath))
    .reduce((acc, val) => acc.concat(val));

const ProcessParentRouteRecord = (
  record: ParentRouteRecord,
  parentPath: string = "",
  componentPath: string = ""
) => {
  let temp: Array<RouteRecordRaw> = [];
  if (!record.default && !record.component) {
    const componentName = `./views${componentPath}/${`${record.name.startsWith(":") ? `[${record.name.substring(1)}]` : record.name}`}.vue`;
    console.log({
      path: parentPath + "/" + record.name,
      component: componentName,
    })
    temp.push({
      path: parentPath + "/" + record.name,
      component: () => import(componentName),
    });
  } else {
    temp.push({
      path: parentPath + "/" + record.name + "/",
      redirect: parentPath + "/" + record.name + "/" + record.default,
    });
  }

  if (!!record.component) {
    temp.push({
      path: parentPath + "/" + record.component,
      component: () =>
        import(
          `./views${componentPath}/${ComponentPath(record.component!)}.vue`
        ),
    });
  }

  if (!record.children) return temp;
  temp.push(
    ...record.children.map((child) => {
      const children = !child.children
        ? undefined
        : ProcessArrayRouteRecord(
            child.children,
            parentPath + "/" + record.name + "/" + child.name,
            componentPath +
              "/" +
              ComponentPath(record.name) +
              "/" +
              ComponentPath(child.name)
          );
      return {
        path: parentPath + "/" + record.name + "/" + child.name,
        component: () =>
          import(
            `./views${componentPath}/${ComponentPath(
              record.name
            )}/${ComponentPath(child.name)}.vue`
          ),
        children: children,
      };
    })
  );

  return temp;
};

const independentPages: Array<ParentRouteRecord> = [
  { name: "Test" },
  { name: "Auth" },
];
const transitionPages: ParentRouteRecord = {
  name: "transitions",
  default: "LandingPage",
  children: [{ name: "LandingPage" }, { name: "Home" }, { name: "Auth" }],
};
const navigationPages: ParentRouteRecord = {
  name: "Navigation",
  default: "Home",
  children: [
    {
      name: "Home",
      children: [
        {
          name: ":name",
        },
      ],
    },
    {
      name: "Forums",
      children: [{ name: ":fid" }],
    },
    { name: "Maps" },
    {
      name: "Settings",
      children: [
        { name: "Profile" },
        { name: "Preferences" },
        { name: "Subscriptions" },
        { name: "About" },
      ],
    },
  ],
};

let routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/transitions/landingpage",
  },
  ...[...new Array(6).keys()].map((key: number) => {
    return {
      path: "/:" + [...new Array(key + 1).keys()].join("/:"),
      component: () => import(`./views/PageNotFound.vue`),
    };
  }),
  ...ProcessParentRouteRecord(transitionPages),
  ...ProcessArrayRouteRecord(independentPages),
  {
    path: "/",
    component: () => import("./views/Navigation.vue"),
    children: ProcessParentRouteRecord(navigationPages),
  },

  // {
  //   path: "/",
  //   component: () => import("./views/Navigation.vue"),
  //   children: [
  //     {
  //       path: "",
  //       redirect: "/home",
  //     },
  //     {
  //       path: "/home",
  //       component: () => import(`./views/navigation/Home.vue`),
  //     },
  //     {
  //       path: "/home/:name",
  //       component: () => import(`./views/navigation/Home/DogProfile.vue`),
  //     },
  //     {
  //       path: "/home/:name/:action",
  //       component: () => import(`./views/navigation/Home/DogProfile.vue`),
  //     },
  //     {
  //       path: "/forums",
  //       component: () => import(`./views/navigation/Forums.vue`),
  //     },
  //     {
  //       path: "/maps",
  //       component: () => import(`./views/navigation/Maps.vue`),
  //     },
  //     {
  //       path: "/settings",
  //       component: () => import(`./views/navigation/Settings.vue`),
  //     },
  //     {
  //       path: "/settings/profile",
  //       component: () => import(`./views/navigation/settings/Profile.vue`),
  //     },
  //     {
  //       path: "/settings/preferences",
  //       component: () => import(`./views/navigation/settings/Preferences.vue`),
  //     },
  //     {
  //       path: "/settings/subscriptions",
  //       component: () =>
  //         import(`./views/navigation/settings/Subscriptions.vue`),
  //     },
  //     {
  //       path: "/settings/about",
  //       component: () => import(`./views/navigation/settings/About.vue`),
  //     },
  //   ],
  // },
];

const addRoutes = () => {
  // routes.push({
  //   path: "/",
  //   component: () => import("./views/Navigation.vue"),
  //   children: [
  //     {
  //       path: "",
  //       redirect: "/home",
  //     },
  //     ...navigationRoutes.map((route) => {
  //       return {
  //         path: route.path,
  //         component: () => import(`./views/navigation/${route.name}.vue`),
  //       };
  //     }),
  //     ...navigationChildren.map((route) => {
  //       return {
  //         path: route.path,
  //         component: () =>
  //           import(`./views/navigation/${route.parent}/${route.name}.vue`),
  //       };
  //     }),
  //   ],
  // });

  // viewsRoutes.forEach((route) =>
  //   routes.push({
  //     path: route.path,
  //     component: () => import(`./views/${route.name}.vue`),
  //   })
  // );

  console.log(routes);

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
