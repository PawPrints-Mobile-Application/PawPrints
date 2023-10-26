import { RouteInfo } from "../../../utils";
import register1 from "./register1.vue";
import register2 from "./register2.vue";

const name = "DogProfiling";
const path = "./views/PageTemplates/DogProfiling/";

const pages = [register1].map((page) => new RouteInfo(page, path));
export { pages, register1, register2 };

export default {
  name: name,
  pages: pages,
  path: path,
};
