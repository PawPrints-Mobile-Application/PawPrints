import { Initialize as InitializeInformation } from "./Information";
import { Initialize as InitializePreferences } from "./Preferences";
import { Initialize as InitializeNotes } from "./Notes";
import { Initialize as InitializeEvents } from "./Events";
import { Initialize as InitializeCalendar } from "./Calendar";
import { Initialize as InitializeDogs } from "./Dogs";

export default function CreateModels() {
  return InitializeInformation()
    .then(InitializePreferences)
    .then(InitializeNotes)
    .then(InitializeEvents)
    .then(InitializeCalendar)
    .then(InitializeDogs);
}
