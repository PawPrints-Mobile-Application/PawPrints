import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import {
  CreateModel as CreateModelDogs,
  SyncAll as SyncAllDogs,
  DeleteModel as DeleteModelDogs,
} from "./Dogs";
import {
  Props as InformationProps,
  Get as SyncAllInformation,
  Set as InitializeInformation,
} from "./Information";
import {
  Sync as SyncLogs,
  CreateModel as CreateModelLogs,
  DeleteModel as DeleteModelLogs,
} from "./Logs";

const CreateModels = async (db: SQLiteDBConnection) =>
  CreateModelDogs(db).then(() => CreateModelLogs(db));
const SyncModels = async (db: SQLiteDBConnection, uid: string) =>
  SyncAllDogs(db, uid)
    .then(() => SyncLogs(db, uid))
    .then(() => SyncAllInformation(uid));
const InitializeModels = async (
  _: SQLiteDBConnection,
  props: InformationProps
) => InitializeInformation(props).then(() => props);
const ClearModels = async (db: SQLiteDBConnection) =>
  DeleteModelDogs(db).then(() => CreateModels(db));
const DeleteModels = async (db: SQLiteDBConnection) =>
  DeleteModelDogs(db).then(() => DeleteModelLogs(db));

export {
  CreateModels,
  SyncModels,
  InitializeModels,
  ClearModels,
  DeleteModels,
};
