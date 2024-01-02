import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { CreateModel as CreateModelDogs, SyncAll as SyncAllDogs } from "./Dogs";
import {
  Props as InformationProps,
  Get as SyncAllInformation,
} from "./Information";

const CreateModels = (db: SQLiteDBConnection) => CreateModelDogs(db);
const SyncModels = (db: SQLiteDBConnection, uid: string) =>
  SyncAllDogs(db, uid).then(() => SyncAllInformation(uid));
const InitializeModels = async (
  db: SQLiteDBConnection,
  props: InformationProps
) => {
  return props;
};
const ClearModels = async (db: SQLiteDBConnection) => {};

export { CreateModels, SyncModels, InitializeModels, ClearModels };
