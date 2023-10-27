import { RouteRecordRaw } from "vue-router";

const templates = {
  signin: () => import("./auth/signin.vue"),
  signup: () => import("./auth/signup.vue"),
  register1: () => import("./dog/register1.vue"),
  register2: () => import("./dog/register2.vue"),
}

const children = [
  {
    name: "signin",
    path: "/auth/signin",
    meta: { requiresAuth: false },
  },
  {
    name: "signup",
    path: "/auth/signup",
    meta: { requiresAuth: false },
  },
  {
    name: "register1",
    path: "/dog/register1",
    meta: { requiresAuth: true },
  },
  {
    name: "register2",
    path: "/dog/register2",
    meta: { requiresAuth: true },
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

export { children, templates };

export default routes;
