import { RouteInfo } from "../../utils";

import LandingPage from "./LandingPage.vue";
import Login from "./Login.vue";
import SplashToLogin from "./SplashToLogin.vue";
import SplashToHome from "./SplashToHome.vue";
import Test from "./Test.vue";

const name = "HiddenPages";
const path = "./views/HiddenPages/";

const pages: RouteInfo[] = [
  LandingPage,
  Login,
  SplashToLogin,
  SplashToHome,
  Test,
].map((page) => new RouteInfo(page, path));
export { LandingPage, Login, SplashToLogin, SplashToHome, Test };

export default {
  name: name,
  pages: pages,
  path: path,
};
