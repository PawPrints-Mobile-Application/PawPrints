import { signOut } from "firebase/auth";
import auth from "../firebase";
import { ClearModels } from "../models";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { UserInfo } from "../../utils";

const FirebaseSignout = () => signOut(auth);

const DatabaseTermination = (db: SQLiteDBConnection) => ClearModels(db);

const WindowDatabaseTermination = () => {
  console.log(`${localStorage.getItem("authUsername")} has logged in.`);
  UserInfo.SetEmail();
  UserInfo.SetSubscription();
  UserInfo.SetUID();
  UserInfo.SetUsername();
  UserInfo.SetTheme();
  UserInfo.SetAvatar();
};

export { FirebaseSignout, DatabaseTermination, WindowDatabaseTermination };
