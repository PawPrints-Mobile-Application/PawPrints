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
import {
  CreateModel as CreateModelLAD,
  ClearModel as ClearModelLAD,
  DeleteModel as DeleteModelLAD,
} from "./LogAddressingData";
import {
  CreateModel as CreateModelLAT,
  ClearModel as ClearModelLAT,
  DeleteModel as DeleteModelLAT,
} from "./LogAddressingTable";

const CreateModels = async (db: SQLiteDBConnection) =>
  CreateModelDogs(db)
    .then(() => CreateModelLAD(db))
    .then(() => CreateModelLAT(db));
const SyncModels = async (db: SQLiteDBConnection, uid: string) =>
  SyncAllDogs(db, uid).then(() => SyncAllInformation(uid));
const InitializeModels = async (
  _: SQLiteDBConnection,
  props: InformationProps
) => InitializeInformation(props).then(() => props);
const ClearModels = async (db: SQLiteDBConnection) =>
  ClearModelDogs(db)
    .then(() => ClearModelLAD(db))
    .then(() => ClearModelLAT(db));
const DeleteModels = async (db: SQLiteDBConnection) =>
  DeleteModelDogs(db)
    .then(() => DeleteModelLAD(db))
    .then(() => DeleteModelLAT(db));

export {
  CreateModels,
  SyncModels,
  InitializeModels,
  ClearModels,
  DeleteModels,
};
