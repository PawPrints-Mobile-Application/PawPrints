import {CreateTable as DogProfileInit} from "./DogProfile";
import {CreateTable as UserProfileInit} from "./UserProfile";
import {CreateTable as PreferencesInit} from "./Preferences";
const CreateDB = () => {
    return new Promise((resolve, reject) => {
        DogProfileInit().then(UserProfileInit).then(PreferencesInit).then(resolve).catch(reject);
    })
}
export default CreateDB;