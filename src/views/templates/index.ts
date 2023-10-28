const templates = {
  signin: () => import("./auth/signin.vue"),
  signup: () => import("./auth/signup.vue"),
  register1: () => import("./dog/register1.vue"),
  register2: () => import("./dog/register2.vue"),
};

const routes = [
  {
    name: "signin",
    path: "/auth/signin",
    parent: "templates/auth/",
    meta: { requiresAuth: false },
  },
  {
    name: "signup",
    path: "/auth/signup",
    parent: "templates/auth/",
    meta: { requiresAuth: false },
  },
  {
    name: "register1",
    path: "/dog/register1",
    parent: "templates/dog/",
    meta: { requiresAuth: true },
  },
  {
    name: "register2",
    path: "/dog/register2",
    parent: "templates/dog/",
    meta: { requiresAuth: true },
  },
];

export { templates };

export default routes;
