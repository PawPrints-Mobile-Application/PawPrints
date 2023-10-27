import { RouteRecordRaw } from "vue-router";

const children = [
  {
    name: "landingpage",
    path: "/landingpage",
    meta: { requiresAuth: false },
  },
  {
    name: "splashtohome",
    path: "/splashtohome",
    meta: { requiresAuth: true },
  },
  {
    name: "splashtologo",
    path: "/splashtoauth",
    meta: { requiresAuth: false },
  },
].map((child) => {
  return {
    name: child.name,
    path: child.path,
    component: () => import("." + child.path + ".vue"),
    meta: child.meta,
  };
});

const routes: Array<RouteRecordRaw> = children.map((child) => {
  return {
    path: child.path,
    component: child.component,
    meta: child.meta,
  };
});

export { children };

export default routes;
