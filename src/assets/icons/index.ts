// import homeFilled from './home.svg';
// import factsFilled from './facts.svg';
// import mapsFilled from './maps.svg';
// import settingsFilled from './settings.svg';

// import homeOutline from './homeOutline.svg';
// import factsOutline from './factsOutline.svg';
// import mapsOutline from './mapsOutline.svg';
// import settingsOutline from './settingsOutline.svg';

import {paw as homeFilled, pawOutline as homeOutline, bulb as factsFilled, bulbOutline as factsOutline, heart as mapsFilled, heartOutline as mapsOutline, settings as settingsFilled, settingsOutline as settingsOutline} from 'ionicons/icons';

const iconsOutline = [homeOutline, factsOutline, mapsOutline, settingsOutline];
const iconsFilled = [homeFilled, factsFilled, mapsFilled, settingsFilled];
const icons = [iconsOutline, iconsFilled]

export {
    homeFilled,
    factsFilled,
    mapsFilled,
    settingsFilled,
    
    homeOutline,
    factsOutline,
    mapsOutline,
    settingsOutline,

    iconsFilled,
    iconsOutline
}

export default icons;