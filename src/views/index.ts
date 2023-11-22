import forumsRecords from "./Forums";
import settingsRecords from "./Settings";

const navigationRecords = [
  { name: "Home" },
  { name: "Dogs" },
  { name: "Forums" },
  { name: "Maps" },
  { name: "Settings" },
];

const independentRoutes = [
  { name: "PageNotFound" },
  { name: "Test" },
  { name: "Auth" },
  { name: "Splash" },
];

export { navigationRecords, forumsRecords, settingsRecords };

export default independentRoutes;
