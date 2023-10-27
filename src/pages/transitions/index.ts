import { RouteRecordRaw } from "vue-router";

const children = [
  {
    name: "LandingPage",
    path: "/landingpage",
    meta: { requiresAuth: false },
  },
  {
    name: "SplashToHome",
    path: "/splashtohome",
    meta: { requiresAuth: true },
  },
  {
    name: "SplashToAuth",
    path: "/splashtoauth",
    meta: { requiresAuth: false },
  },
].map((child) => {
  return {
    name: child.name,
    path: child.path,
    component: () => import("./" + child.name + ".vue"),
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
