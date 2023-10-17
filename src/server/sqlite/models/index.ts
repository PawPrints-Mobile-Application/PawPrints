import DogProfile from "./DogProfile";
import { ConnectDB, CreateTable } from "..";

const models = [DogProfile];
const CreateDB = () => models.forEach(async (model) => await ConnectDB((db) => CreateTable(db, model.name, model.columns)));

export { DogProfile, CreateDB };

export default models;
