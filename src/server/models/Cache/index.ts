import Accounts from "./Accounts";
import LoginHistory from "./LoginHistory";

import { ConnectDB, CreateTable } from "../../sqlite";

const models = [Accounts, LoginHistory];

const CreateDB = async () =>
await ConnectDB("Cache", async (db) =>
    models.forEach((model) => CreateTable(db, model.name, model.modelColumn))
  );

export { Accounts, LoginHistory, CreateDB };

export default models;
