import { defaults as defaultsPreferences } from "./Preferences";

import { Initialize as InitializeInformation } from './Information'

export {
  defaultsPreferences,
}

export default function CreateModels() {
  return InitializeInformation();
}