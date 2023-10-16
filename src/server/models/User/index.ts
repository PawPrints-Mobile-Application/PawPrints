import UserProfile from "./UserProfile";
import Preferences from "./Preferences";
import DogProfile from "../Dog/DogProfile";

import { ConnectDB, DisconnectDB, CreateTable } from "../../sqlite";

const models = [UserProfile, Preferences, DogProfile];

const CreateDB = async () => {
  const { sqlite, db } = await ConnectDB("User");
  models.forEach(async (model) => await CreateTable(db, model.name, model.modelColumn));
  await DisconnectDB(sqlite, 'User');
};
export { UserProfile, Preferences, DogProfile, CreateDB };

export default models;
