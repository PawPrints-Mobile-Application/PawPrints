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

type RouteInfo = {
  name: string;
  path: string;
  parent: string;
};

type RouteData = {
  name: string;
  path: string;
  meta: {
    requiresAuth: boolean;
  };
  icons?: {
    default: string;
    active: string;
  };
};

let children: RouteInfo[] = [];

const routes: RouteData[] = [
  {
    name: "Home",
    icons: {
      default: homeDefault,
      active: homeActive,
    },
    children: [],
  },
  {
    name: "Facts",
    icons: {
      default: factsDefault,
      active: factsActive,
    },
    children: [],
  },
  {
    name: "Maps",
    icons: {
      default: mapsDefault,
      active: mapsActive,
    },
    children: [],
  },
  {
    name: "Settings",
    icons: {
      default: settingsDefault,
      active: settingsActive,
    },
    children: [
      { name: "Profile" },
      { name: "Preferences" },
      { name: "Subscriptions" },
      { name: "About" },
    ],
  },
].map((route) => {
  children = route.children.map((child) => {
    return {
      name: child.name,
      parent: route.name,
      path: '/' + route.name + '/' + child.name,
    };
  });
  return {
    name: route.name,
    path: `/${route.name}`,
    meta: { requiresAuth: true },

    icons: route.icons,
  };
});

export { children };

export default routes;
