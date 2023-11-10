import { signOut } from "firebase/auth";
import auth from "../firebase";
import { Clear as InformationClear } from "../models/Information";

const FirebaseSignout = () => signOut(auth);

const DatabaseTermination = () => {
  const informationData = InformationClear();
  return Promise.all([informationData]).then((response) => {
    console.log("Database Initialization Successful!");
    return response;
  });
};

const WindowDatabaseTermination = () => {
  console.log(`${localStorage.getItem("authUsername")} has logged in.`);
  window.localStorage.setItem("authType", "");
  window.localStorage.setItem("authID", "");
  window.localStorage.setItem("authUsername", "");
  window.localStorage.setItem("authEmail", "");
};

export { FirebaseSignout, DatabaseTermination, WindowDatabaseTermination };
