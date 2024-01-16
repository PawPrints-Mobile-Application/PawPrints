import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import {
  CreateModel as CreateModelDogs,
  SyncAll as SyncAllDogs,
  ClearModel as ClearModelDogs,
  // DeleteModel as DeleteModelDogs,
} from "./Dogs";
import {
  Props as InformationProps,
  Get as SyncAllInformation,
  Set as InitializeInformation,
} from "./Information";
import {
  CreateModel as CreateModelLAD,
  ClearModel as ClearModelLAD,
} from "./LogAddressingData";
import {
  CreateModel as CreateModelLAT,
  ClearModel as ClearModelLAT,
} from "./LogAddressingTable";

const CreateModels = async (db: SQLiteDBConnection) =>
  CreateModelDogs(db)
    .then(() => CreateModelLAD(db))
    .then(() => CreateModelLAT(db));
const SyncModels = async (db: SQLiteDBConnection, uid: string) => {
  console.log(true);
  return SyncAllDogs(db, uid).then(() => SyncAllInformation(uid));
};
const InitializeModels = async (
  _: SQLiteDBConnection,
  props: InformationProps
) => InitializeInformation(props).then(() => props);
const ClearModels = async (db: SQLiteDBConnection) =>
  ClearModelDogs(db)
    .then(() => ClearModelLAD(db))
    .then(() => ClearModelLAT(db));

export { CreateModels, SyncModels, InitializeModels, ClearModels };
