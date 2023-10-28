import Home from "./Home.vue";
import Facts from "./Facts.vue";
import Maps from "./Maps.vue";
import Settings from "./Settings.vue";
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

const pages = [
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
  ];

const routes = pages.map((page) => {
  return {
    name: page.name,
    path: `/${page.name}`,
    filePath: `NavPages/${page.name}`,
    icons: page.icons
  };
});

export { Home, Facts, Maps, Settings, routes };

export default routes;
