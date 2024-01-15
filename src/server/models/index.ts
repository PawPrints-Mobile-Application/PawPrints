import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import {
  CreateModel as CreateModelDogs,
  SyncAll as SyncAllDogs,
  ClearModel as ClearModelDogs,
  DeleteModel as DeleteModelDogs
} from "./Dogs";
import {
  Props as InformationProps,
  Get as SyncAllInformation,
  Set as InitializeDogs,
} from "./Information";

const CreateModels = (db: SQLiteDBConnection) => DeleteModelDogs(db).then(() =>CreateModelDogs(db));
const SyncModels = (db: SQLiteDBConnection, uid: string) =>
  SyncAllDogs(db, uid).then(() => SyncAllInformation(uid));
const InitializeModels = async (
  db: SQLiteDBConnection,
  props: InformationProps
) => InitializeDogs(props).then(() => props);
const ClearModels = async (db: SQLiteDBConnection) => ClearModelDogs(db);

export { CreateModels, SyncModels, InitializeModels, ClearModels };
