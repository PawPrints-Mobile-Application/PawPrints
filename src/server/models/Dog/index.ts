import DogProfile from "../Dog/DogProfile";

import { ConnectDB, CreateTable } from "../../sqlite";

const models = [DogProfile];

const CreateDB = async () =>
await ConnectDB("Dog", async (db) =>
    models.forEach((model) => CreateTable(db, model.name, model.modelColumn))
  );

export { DogProfile, CreateDB };

export default models;
