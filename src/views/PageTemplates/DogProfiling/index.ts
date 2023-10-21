import { RouteInfo } from "../../../utils";

import register0 from "./register0.vue";

const name = "DogProfiling";
const path = "./views/PageTemplates/DogProfiling/";

const pages = [register0].map((page) => new RouteInfo(page, path));
export { pages, register0 };

export default {
  name: name,
  pages: pages,
  path: path,
};
