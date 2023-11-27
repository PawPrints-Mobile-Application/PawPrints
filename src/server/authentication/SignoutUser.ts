import { signOut } from "firebase/auth";
import auth from "../firebase";
import { ClearModels } from "../models";
import { Enums as InformationEnums } from "../models/Information";

const FirebaseSignout = () => signOut(auth);

const DatabaseTermination = () => ClearModels();

const WindowDatabaseTermination = () => {
  console.log(`${localStorage.getItem("authUsername")} has logged in.`);
  window.localStorage.setItem(
    "colorTheme",
    new InformationEnums.Theme().yellow
  );
  window.localStorage.setItem("colorMode", new InformationEnums.Mode().light);
  window.localStorage.setItem("authType", "");
  window.localStorage.setItem("authID", "");
  window.localStorage.setItem("authUsername", "");
  window.localStorage.setItem("authEmail", "");
};

export { FirebaseSignout, DatabaseTermination, WindowDatabaseTermination };
