import Home from "./Home.vue";
import Map from "./Map.vue";
import Calendar from "./Calendar.vue";
import Profile from "./Profile.vue";
import Insight from "./Insight.vue";

import LogIn from "./LogIn.vue";
import SignInModal from './SignInModal.vue';
import SignUp from "./SignUp.vue";

import { playCircle } from 'ionicons/icons';

const navPages = [Home, Map, Calendar, Profile, Insight].map(page => PageInfo(page));

const hiddenPages = [LogIn, SignInModal, SignUp].map(page => PageInfo(page));

const pages = navPages.concat(hiddenPages);



function PageInfo(page: any) {
    return {
        name: page.name,
        component: page,
        path: `/${page.name.toLowerCase()}`,
        icon: playCircle
    };
};

export {
    Home, Calendar, Profile, Map, Insight,

    LogIn, SignInModal, SignUp,

    navPages, hiddenPages
}

export default pages;