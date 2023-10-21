import DogProfileModel from "./DogProfile";
import UserProfileModel from "./UserProfile";
import PreferencesModel from "./Preferences";

const dbName = 'Guest';
const models = [DogProfileModel, UserProfileModel, PreferencesModel];

export default {
    dbName: dbName,
    models: models
};
