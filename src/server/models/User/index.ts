import UserProfile from "./UserProfile";
import Preferences from "./Preferences";

const models = [UserProfile, Preferences];

export { UserProfile, Preferences };

export default {
  name: 'User',
  models: models
};
