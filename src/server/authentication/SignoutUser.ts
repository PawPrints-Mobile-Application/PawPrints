import { signOut } from "firebase/auth";
import auth from "../firebase";
import { ClearModels } from "../models";

const FirebaseSignout = () => signOut(auth);

const DatabaseTermination = () => ClearModels();

const WindowDatabaseTermination = () => {
  console.log(`${localStorage.getItem("authUsername")} has logged in.`);
  window.localStorage.setItem("authType", "");
  window.localStorage.setItem("authID", "");
  window.localStorage.setItem("authUsername", "");
  window.localStorage.setItem("authEmail", "");
};

export { FirebaseSignout, DatabaseTermination, WindowDatabaseTermination };
