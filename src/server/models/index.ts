import {
  CreateModel as CreateModelInformation,
  DeleteModel as DeleteModelInformation,
  Clear as ClearInformation,
  Sync as SyncInformation,
  Set as SetInformation,
  Props as PropsInformation,
} from "./Information";
import {
  CreateModel as CreateModelPreferences,
  DeleteModel as DeleteModelPreferences,
  Clear as ClearPreferences,
  Sync as SyncPreferences,
  Set as SetPreferences,
  defaults as defaultsPreferences,
} from "./Preferences";
import {
  CreateModel as CreateModelNotes,
  DeleteModel as DeleteModelNotes,
  Clear as ClearNotes,
  SyncAll as SyncNotes,
} from "./Notes";
import {
  CreateModel as CreateModelEvents,
  DeleteModel as DeleteModelEvents,
  Clear as ClearEvents,
  SyncAll as SyncEvents,
} from "./Events";
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
    .then(DeleteModelPreferences)
    .then(DeleteModelNotes)
    .then(DeleteModelEvents)
    .then(DeleteModelCalendar)
    .then(DeleteModelDogs);

const ClearModels = () =>
  ClearInformation()
    .then(ClearPreferences)
    .then(ClearNotes)
    .then(ClearEvents)
    .then(ClearCalendar)
    .then(ClearDogs);

const SyncModels = (uid: string) =>
  SyncPreferences(uid)
    .then(() => SyncNotes(uid))
    .then(() => SyncEvents(uid))
    .then(() => SyncCalendar(uid))
    .then(() => SyncDogs(uid))
    .then(() => SyncInformation(uid))
    .then((response) => response);

const InitializeModels = (props: PropsInformation, uid?: string) =>
  SetPreferences(defaultsPreferences, uid).then(() =>
    SetInformation(props, uid)
  );

export { DeleteModels, ClearModels, SyncModels, InitializeModels };

export default async function CreateModels() {
  return CreateModelInformation()
    .then(CreateModelPreferences)
    .then(CreateModelNotes)
    .then(CreateModelEvents)
    .then(CreateModelCalendar)
    .then(CreateModelDogs);
}
