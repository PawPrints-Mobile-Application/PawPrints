import { SetDocument, GetDocument, DeleteDocument, GetCollection } from "../";
import { Props as UserProfileProps } from "../../models/UserProfile";
import { Props as PreferencesProps } from "../../models/Preferences";
import { Props as DogProfileProps } from "../../models/DogProfile";
const collectionName = "Users";

const SetUserData = (props: UserProfileProps) =>
  SetDocument(collectionName, props.uid, props);
const GetUserData = () =>
  GetDocument(collectionName, localStorage.getItem("authID")!).then((data) =>
    data?.data()
  );
const DeleteUserData = () =>
  DeleteDocument(collectionName, localStorage.getItem("authID")!);

const SetUserProfile = (props: UserProfileProps) =>
  SetDocument(collectionName, props.uid, props);
const GetUserProfile = (userID?: string) => {
  const uid = !!userID ? userID : localStorage.getItem("authID")!;
  return GetDocument(collectionName, uid).then(
    (data) => data?.data()?.UserProfile
  );
};

const SetPreferences = (props: PreferencesProps) =>
  SetDocument(collectionName, localStorage.getItem("authID")!, props);
const GetPreferences = () =>
  GetDocument(collectionName, localStorage.getItem("authID")!).then(
    (data) => data?.data()?.Preferences
  );

const SetDogs = (props: Array<DogProfileProps>) =>
  Promise.all(props.map((data) => SetDog(data)));
const GetDogsQuerySnapshot = () =>
  GetCollection(`${collectionName}/${localStorage.getItem("authID")}/Dogs`);
const GetDogs = () =>
  GetCollection(
    `${collectionName}/${localStorage.getItem("authID")}/Dogs`
  ).then((value) => value!.values);

const SetDog = (props: DogProfileProps) =>
  SetDocument(
    `${collectionName}/${localStorage.getItem("authID")}/Dogs`,
    props.name,
    props
  );
const GetDog = (name: string) =>
  GetDocument(
    `${collectionName}/${localStorage.getItem("authID")}/Dogs`,
    name
  ).then((data) => data?.data());

export {
  SetUserData,
  GetUserData,
  DeleteUserData,
  SetUserProfile,
  GetUserProfile,
  SetPreferences,
  GetPreferences,
  SetDogs,
  GetDogsQuerySnapshot,
  GetDogs,
  SetDog,
  GetDog,
};
