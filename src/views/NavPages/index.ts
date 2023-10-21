import { RouteInfo } from "../../utils";

import Home from "./Home.vue";
import Facts from "./Facts.vue";
import Maps from "./Maps.vue";
import Settings from "./Settings.vue";

const name = "NavPages";
const path = "./views/NavPages/";

const pages: RouteInfo[] = [Home, Facts, Maps, Settings].map(
  (page) => new RouteInfo(page, path)
);
export { Home, Facts, Maps, Settings };

export default {
  name: name,
  pages: pages,
  path: path,
};
