import { signOut } from "firebase/auth";
import auth from "../firebase";
import { ClearModels } from "../models";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { PawprintsEvent, UserInfo } from "../../utils";

const FirebaseSignout = () => signOut(auth);

const DatabaseTermination = (db: SQLiteDBConnection) => ClearModels(db);

const WindowDatabaseTermination = () => {
  console.log(`${localStorage.getItem("authUsername")} has logged out.`);
  UserInfo.SetEmail();
  UserInfo.SetSubscription();
  UserInfo.SetUID();
  UserInfo.SetUsername();
  UserInfo.SetTheme();
  UserInfo.SetAvatar();
  PawprintsEvent.EventDispatcher("set-themes");
};

export { FirebaseSignout, DatabaseTermination, WindowDatabaseTermination };
