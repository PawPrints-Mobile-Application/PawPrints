import Home from "./Home.vue";
import Maps from "./Maps.vue";
import Settings from "./Settings.vue";
import Facts from "./Facts.vue";

import SplashScreen from './SplashScreen.vue';
import LogIn from "./LogIn.vue";
import SignUpPage from "./SignUpPage.vue";

import SignInPage from "./SignInPage.vue";

import {iconsFilled, iconsOutline} from '../assets/icons';
import {documentOutline, document} from 'ionicons/icons';

const navPages = [Home, Maps, Facts, Settings].map((page, id) => PageInfo(page, [iconsFilled[id], iconsOutline[id]]));

const hiddenPages = [SplashScreen, LogIn, SignUpPage, SignInPage].map(page => PageInfo(page, [document, documentOutline]));

const pages = navPages.concat(hiddenPages);



function PageInfo(page: any, icons: Array<string>) {
    return {
        name: page.name,
        component: page,
        path: `/${page.name.toLowerCase()}`,
        icons: icons
    };
};

export {
    Home, Facts, Maps, Settings,

    SplashScreen, LogIn, SignUpPage,

    SignInPage,

    navPages, hiddenPages
}

export default pages;