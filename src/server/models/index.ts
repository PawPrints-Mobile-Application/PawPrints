import cacheModels from "./Temps";
import userModels from "./User";
import dogModels from "./Dog";
import { ConnectDB, CreateTable, DeleteTable } from "../sqlite";

const models = [cacheModels].concat(userModels, dogModels);
const CreateDB = async () =>
  models.forEach(async (model) =>
  await ConnectDB(model.name, async (db) =>
      model.models.forEach(async (each) => {
        await CreateTable(db, each.name, each.modelColumn);
        // await DeleteTable(db, each.name);
      })
    )
  );

export { userModels, cacheModels, dogModels, CreateDB };

export default models;
