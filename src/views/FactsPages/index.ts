import { RouteInfo } from "../../utils";

import whyDoDogsHaveTails from "./whyDoDogsHaveTails.vue";

const name = "FactsPages";
const path = "./views/FactsPages/";

const pages: RouteInfo[] = [whyDoDogsHaveTails].map(
  (page) => new RouteInfo(page, path)
);
export { whyDoDogsHaveTails as facts0 };

export default {
  name: name,
  pages: pages,
  path: path,
};
