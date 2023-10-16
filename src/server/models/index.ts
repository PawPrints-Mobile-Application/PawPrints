import cacheModels, { CreateDB as CreateCacheDB } from "./Cache";
import userModels, { CreateDB as CreateUserDB } from "./User";
import dogModels, { CreateDB as CreateDogDB } from "./Dog";

const models = cacheModels.concat(userModels, dogModels);
const CreateDBs = async () => {
  await CreateCacheDB();
  await CreateUserDB();
  await CreateDogDB();
};

export {
  userModels,
  cacheModels,
  dogModels,
  CreateDBs,
  CreateCacheDB,
  CreateUserDB,
  CreateDogDB,
};

export default models;
