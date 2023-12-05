import forumsRecords from "./Forums";
import settingsRecords from "./Settings";

const navigationRecords = [
  { name: "Home" },
  { name: "Forums" },
  { name: "Dogs" },
  { name: "Maps" },
  { name: "Settings" },
];

const independentRoutes = [
  { name: "PageNotFound" },
  { name: "Test" },
  { name: "Auth" },
  { name: "Splash" },
  { name: "Tutorial" },
];

export { navigationRecords, forumsRecords, settingsRecords };

export default independentRoutes;
