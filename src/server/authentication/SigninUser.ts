import { User, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../server/firebase";
import { SyncModels, InitializeModels } from "../models";
import {
  Enums as InformationEnums,
  Props as InformationProps,
} from "../models/Information";
import { PawprintsEvent, SeedGenerator, UserInfo } from "../../utils";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

const GuestData = {
  informationProps: {
    uid: SeedGenerator().toString(),
    email: "Guest",
    username: "Hooman",
    subscription: InformationEnums.Subscription.guest,
    theme: InformationEnums.Theme.yellow,
    mode: InformationEnums.Mode.dark,
    avatar: 2,
  },
};

type Form = {
  email: string;
  password: string;
};

const FirebaseLogin = (form: Form) =>
  signInWithEmailAndPassword(auth, form.email, form.password).then(
    (userCredential) => {
      console.log("Firebase Login Successful!");
      return userCredential.user;
    }
  );

const DatabaseInitialization = async (db: SQLiteDBConnection, user?: User) => {
  const process: Promise<InformationProps> = !!user
    ? SyncModels(db, user.uid)
    : InitializeModels(db, GuestData.informationProps);

  return process.then((response: InformationProps) => {
    console.log("Database Initialization Successful!");
    return response;
  });
};

const WindowDatabaseInitialization = (props: InformationProps) => {
  UserInfo.SetEmail(props.email);
  UserInfo.SetSubscription(props.subscription);
  UserInfo.SetUID(props.uid);
  UserInfo.SetUsername(props.username);
  UserInfo.SetTheme(props.theme, props.mode);
  UserInfo.SetAvatar(props.avatar);
  console.log(`${props.username} has logged in.`);
  PawprintsEvent.EventDispatcher("set-themes");
  PawprintsEvent.EventDispatcher("sync-data");
};

export { FirebaseLogin, DatabaseInitialization, WindowDatabaseInitialization };
