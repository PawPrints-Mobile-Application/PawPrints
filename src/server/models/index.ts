import {
  CreateModel as CreateModelInformation,
  DeleteModel as DeleteModelInformation,
  Clear as ClearInformation,
  Sync as SyncInformation,
  Set as SetInformation,
  Props as PropsInformation,
} from "./Information";
import {
  CreateModel as CreateModelLogs,
  DeleteModel as DeleteModelLogs,
  Clear as ClearLogs,
  SyncAll as SyncLogs,
} from "./Logs";
import {
  CreateModel as CreateModelCalendar,
  DeleteModel as DeleteModelCalendar,
  Clear as ClearCalendar,
  SyncAll as SyncCalendar,
} from "./Calendar";
import {
  CreateModel as CreateModelDogs,
  DeleteModel as DeleteModelDogs,
  Clear as ClearDogs,
  SyncAll as SyncDogs,
} from "./Dogs";

const DeleteModels = () =>
  DeleteModelInformation()
    .then(DeleteModelLogs)
    .then(DeleteModelCalendar)
    .then(DeleteModelDogs);

const ClearModels = () =>
  ClearInformation().then(ClearLogs).then(ClearCalendar).then(ClearDogs);

const SyncModels = (uid: string) =>
  SyncLogs(uid)
    .then(() => SyncCalendar(uid))
    .then(() => SyncDogs(uid))
    .then(() => SyncInformation(uid))
    .then((response) => response);

const InitializeModels = (props: PropsInformation, uid?: string) =>
  SetInformation(props, uid);

export { DeleteModels, ClearModels, SyncModels, InitializeModels };

export default async function CreateModels() {
  return DeleteModels()
    .then(CreateModelInformation)
    .then(CreateModelLogs)
    .then(CreateModelCalendar)
    .then(CreateModelDogs);
}
