import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

let routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/test",
  },
  {
    path: "/test",
    component: () => import(`./views/Test.vue`),
  }
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

export default router;
