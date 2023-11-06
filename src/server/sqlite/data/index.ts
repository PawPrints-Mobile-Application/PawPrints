import {CreateTable as AccountsInit} from "./Cache/Accounts";
import {CreateTable as LoginHistoryInit} from "./Cache/LoginHistory";
import {CreateTable as DogProfileInit} from "./User/DogProfile";
import {CreateTable as UserProfileInit} from "./User/UserProfile";
import {CreateTable as PreferencesInit} from "./User/Preferences";
const CreateDB = () => {
    return new Promise((resolve, reject) => {
        AccountsInit().then(LoginHistoryInit).then(DogProfileInit).then(UserProfileInit).then(PreferencesInit).then(resolve).catch(reject);
    })
}
export default CreateDB;