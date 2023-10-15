import Home from "./Home.vue";
import Facts from "./Facts.vue";
import Maps from "./Maps.vue";
import Settings from "./Settings.vue";

import { RouteInfo } from "../../utils";

const navPages = [Home, Facts, Maps, Settings].map(page => new RouteInfo(page));

export { Home, Facts, Maps, Settings, navPages };

export default navPages;
