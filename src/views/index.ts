import forumsRecords from "./Forums";
import settingsRecords from "./Settings";

import {
  albumsOutline as homeDefault,
  albums as homeActive,
  pawOutline as dogsDefault,
  paw as dogsActive,
  bulbOutline as forumsDefault,
  bulb as forumsActive,
  mapOutline as mapsDefault,
  map as mapsActive,
  settingsOutline as settingsDefault,
  settings as settingsActive,
} from "ionicons/icons";

const navigationRecords = [
  {
    name: "Home",
    icons: {
      default: homeDefault,
      active: homeActive,
    },
  },
  {
    name: "Dogs",
    icons: {
      default: dogsDefault,
      active: dogsActive,
    },
  },
  {
    name: "Forums",
    icons: {
      default: forumsDefault,
      active: forumsActive,
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

const independentRoutes = [
  { name: "PageNotFound" },
  { name: "Test" },
  { name: "Auth" },
  { name: "Splash" },
];

export {
  navigationRecords,
  forumsRecords,
  settingsRecords,
};

export default independentRoutes;
