import LandingPage from "./LandingPage.vue";
import LogIn from "./LogIn.vue";
import SignInPage from "./SignInPage.vue";
import SignUpPage from "./SignUpPage.vue";
import SplashToLogin from "./SplashToLogin.vue";
import SplashToHome from "./SplashToHome.vue";

import Test from "./Test.vue";

const pages = ['LandingPage', 'SignInPage', 'SignUpPage', 'SignUpPage', 'SplashToLogin', 'SplashToHome', 'Test'];

const routes = pages.map((page) => {
  return {
    name: page,
    path: `/${page}`,
    filePath: `HiddenPages/${page}`,
    icons: {default: '', active: ''}
  };
});

export {LandingPage, LogIn, SignInPage, SignUpPage, SplashToLogin, SplashToHome, Test}

export default routes;
