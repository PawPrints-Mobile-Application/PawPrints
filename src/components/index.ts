import Tab from './Tab.vue'
import { playCircle, search } from 'ionicons/icons';

const routes = [
    {
        name: 'Home',
        icon: playCircle
    },
    {
        name: 'Search',
        icon: search
    },
    {
        name: 'Play',
        icon: playCircle
    },
  ];

export {
    Tab,
    routes
}