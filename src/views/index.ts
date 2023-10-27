import { RouteRecordRaw } from "vue-router";

import navigationRoutes from "./navigation";
import templates from "./templates";
import transitions from "./transitions";

const pages = [
  {
    name: "Auth",
    meta: { requiresAuth: false },
  },
  {
    name: "Test",
    meta: { requiresAuth: false },
  },
];

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/landingpage",
  },
  {
    path: "/",
    component: () => import("./Navigation.vue"),
    children: navigationRoutes,
  },
  ...templates,
  ...transitions,
  ...pages.map((child) => {
    return {
      name: child.name,
      component: () => import("./" + child.name + ".vue"),
      path: `/${child.name}`,
    };
  }),
];

export default routes;
