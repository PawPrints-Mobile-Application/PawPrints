import LandingPage from "./LandingPage.vue";
import LogIn from "./LogIn.vue";
import SignInPage from "./SignInPage.vue";
import SignUpPage from "./SignUpPage.vue";
import SplashToLogin from "./SplashToLogin.vue";
import SplashToHome from "./SplashToHome.vue";

import Test from "./Test.vue";

import { RouteInfo } from "../../utils";

const hiddenPages = [
  LandingPage,
  LogIn,
  SignInPage,
  SignUpPage,
  SplashToLogin,
  SplashToHome, 
  Test
].map(page => new RouteInfo(page));
export { LandingPage, LogIn, SignInPage, SignUpPage, SplashToLogin, SplashToHome, Test, hiddenPages };

export default hiddenPages;
