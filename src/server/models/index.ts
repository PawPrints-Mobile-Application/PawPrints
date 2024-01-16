import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import {
  CreateModel as CreateModelDogs,
  SyncAll as SyncAllDogs,
  ClearModel as ClearModelDogs,
  DeleteModel as DeleteModelDogs,
} from "./Dogs";
import {
  Props as InformationProps,
  Get as SyncAllInformation,
  Set as InitializeInformation,
} from "./Information";
import { CreateModel as CreateModelLAD } from "./LogAddressingData";
import { CreateModel as CreateModelLAT } from "./LogAddressingTable";

const CreateModels = (db: SQLiteDBConnection) =>
  DeleteModelDogs(db)
    .then(() => CreateModelDogs(db))
    .then(() => CreateModelLAD(db))
    .then(() => CreateModelLAT(db));
const SyncModels = (db: SQLiteDBConnection, uid: string) =>
  SyncAllDogs(db, uid).then(() => SyncAllInformation(uid));
const InitializeModels = async (
  db: SQLiteDBConnection,
  props: InformationProps
) => InitializeInformation(props).then(() => props);
const ClearModels = async (db: SQLiteDBConnection) => ClearModelDogs(db);

export { CreateModels, SyncModels, InitializeModels, ClearModels };
