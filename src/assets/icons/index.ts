// import homeFilled from './home.svg';
// import factsFilled from './facts.svg';
// import mapsFilled from './maps.svg';
// import settingsFilled from './settings.svg';

// import homeOutline from './homeOutline.svg';
// import factsOutline from './factsOutline.svg';
// import mapsOutline from './mapsOutline.svg';
// import settingsOutline from './settingsOutline.svg';

import settingsProfile from './settingsProfile.svg';
import settingsPreferences from './settingsPreferences.svg';
import settingsSubscriptions from './settingsSubscriptions.svg';
import settingsAbout from './settingsAbout.svg';
import weight from './weight.svg';
import temperature from './temperature.svg';
import vaccine from './vaccine.svg';
import medicine from './medicine.svg';
import symptom from './symptom.svg';
import activity from './activity.svg';

const settingsCardIcons = {settingsProfile, settingsPreferences, settingsSubscriptions, settingsAbout};

import {paw as homeFilled, pawOutline as homeOutline, bulb as factsFilled, bulbOutline as factsOutline, heart as mapsFilled, heartOutline as mapsOutline, settings as settingsFilled, settingsOutline as settingsOutline} from 'ionicons/icons';

const iconsOutline = [homeOutline, factsOutline, mapsOutline, settingsOutline];
const iconsFilled = [homeFilled, factsFilled, mapsFilled, settingsFilled];
const icons = [iconsOutline, iconsFilled]

export {
    weight,
    temperature,
    vaccine,
    medicine,
    symptom,
    activity,
    homeFilled,
    factsFilled,
    mapsFilled,
    settingsFilled,
    
    homeOutline,
    factsOutline,
    mapsOutline,
    settingsOutline,

    settingsCardIcons,
    settingsProfile,
    settingsPreferences,
    settingsSubscriptions,
    settingsAbout,

    iconsFilled,
    iconsOutline
}

export default icons;