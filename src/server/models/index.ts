import { Initialize as InitializeInformation } from './Information';
import { Initialize as InitializeNotes } from './Notes';

export default function CreateModels() {
  return InitializeInformation().then(InitializeNotes);
}