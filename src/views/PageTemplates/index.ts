import { RouteInfo } from "../../utils";

import SigninTemplate from "./SigninTemplate.vue";
import SignupTemplate from "./SignupTemplate.vue";

import DogProfiling from "./DogProfiling";

const name = "PageTemplates";
const path = "./views/PageTemplates/";

const pages: RouteInfo[] = [SigninTemplate, SignupTemplate]
  .map((page) => new RouteInfo(page, path))
  .concat(DogProfiling.pages);
export { SigninTemplate, SignupTemplate };

export default {
  name: name,
  pages: pages,
  path: path,
};
