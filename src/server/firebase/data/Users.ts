import { SetDocument, GetDocument, DeleteDocument } from "../";
import { Props as UserProfileProps } from "../../models/UserProfile";
import { Props as PreferencesProps } from "../../models/Preferences";
import { Props as DogProfileProps } from "../../models/DogProfile";
const collectionName = "Users";

const Set = (props: UserProfileProps) =>
  SetDocument(collectionName, props.uid, props);
const Get = (props: UserProfileProps) => GetDocument(collectionName, props.uid);
const Delete = (props: UserProfileProps) => DeleteDocument(collectionName, props.uid);

const SetPreferences = (props: PreferencesProps) =>
  SetDocument(collectionName, props.uid, props);
const GetPreferences = (props: PreferencesProps) =>
  GetDocument(collectionName, props.uid);

const SetDogProfile = (props: DogProfileProps) =>
  SetDocument(collectionName, props.uid, props);
const GetDogProfile = (props: DogProfileProps) =>
  GetDocument(collectionName, props.uid);

export {
  Set,
  Get,
  Delete,
  SetPreferences,
  GetPreferences,
  SetDogProfile,
  GetDogProfile,
};
