import Home from "./Home.vue";
import Maps from "./Maps.vue";
import Settings from "./Settings.vue";
import Facts from "./Facts.vue";

import LogIn from "./LogIn.vue";
import SignUpPage from "./SignUpPage.vue";
import SignInPage from "./SignInPage.vue";

import LandingPage from "./LandingPage.vue";
import SplashToLogin from "./SplashToLogin.vue";

import Test from "./Test.vue";

import {iconsFilled, iconsOutline} from '../assets/icons';
import {documentOutline, document} from 'ionicons/icons';

const navPages = [Home, Maps, Facts, Settings].map((page, id) => PageInfo(page, [iconsFilled[id], iconsOutline[id]]));

const hiddenPages = [
    LogIn, SignUpPage, SignInPage,
    LandingPage, SplashToLogin,
    Test
].map(page => PageInfo(page, [document, documentOutline]));

const pages = navPages.concat(hiddenPages);


// add meta of requiresAuth and requiresInternet
function PageInfo(page: any, icons: Array<string>) {
    return {
        name: page.name,
        component: page,
        path: `/${page.name}`,
        icons: icons
    };
};

export {
    Home, Facts, Maps, Settings,

    LogIn, SignUpPage, SignInPage,

    LandingPage, SplashToLogin,
    
    Test,

    navPages, hiddenPages
}

export default pages;