import homeRecords from "./Home";
import dogsRecords from "./Dogs";
import forumsRecords from "./Forums";
import settingsRecords from "./Settings";
import transitionRecords from "./transition";

import {
  pawOutline as homeDefault,
  paw as homeActive,
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
  // {
  //   name: "Dogs",
  //   icons: {
  //     default: homeDefault,
  //     active: homeActive,
  //   },
  // },
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
];

export {
  navigationRecords,
  homeRecords,
  dogsRecords,
  forumsRecords,
  settingsRecords,
  transitionRecords,
};

export default independentRoutes;
