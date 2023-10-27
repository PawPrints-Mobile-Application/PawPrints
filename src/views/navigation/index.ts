import { RouteRecordRaw } from "vue-router";
import {
  pawOutline as homeDefault,
  paw as homeActive,
  bulbOutline as factsDefault,
  bulb as factsActive,
  mapOutline as mapsDefault,
  map as mapsActive,
  settingsOutline as settingsDefault,
  settings as settingsActive,
} from "ionicons/icons";

const children = [
  {
    name: "Home",
    icons: {
      default: homeDefault,
      active: homeActive,
    },
  },
  {
    name: "Facts",
    icons: {
      default: factsDefault,
      active: factsActive,
    },
  },
  {
    name: "Maps",
    icons: {
      default: mapsDefault,
      active: mapsActive,
    },
  },
  {
    name: "Settings",
    icons: {
      default: settingsDefault,
      active: settingsActive,
    },
  },
].map((child) => {
  return {
    name: child.name,
    icons: child.icons,
    path: `/${child.name}`,
    component: () => import("./" + child.name + ".vue"),
    meta: { requiresAuth: true },
  };
});

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/home",
  },
  ...children.map((child) => {
    return {
      path: child.path,
      component: child.component,
      meta: child.meta,
    };
  }),
];

export { children };

export default routes;
