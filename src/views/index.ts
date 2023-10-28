import { RouteRecordRaw } from "vue-router";

import navigationRoutes from "./navigation";
import templateRoutes from "./templates";
import transitionRoutes from "./transitions";

const children = [
  {
    name: "Auth",
    meta: { requiresAuth: false },
  },
  {
    name: "Test",
    meta: { requiresAuth: false },
  },
];

const routes: Array<RouteRecordRaw> = children.map((child) => {
  return {
    component: () => import("./" + child.name + ".vue"),
    path: `/${child.name}`,
  };
});

export {
  navigationRoutes, templateRoutes, transitionRoutes, routes
}

export default routes;
