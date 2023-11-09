import { signOut } from "firebase/auth";
import auth from "../firebase";
import { DeleteUser } from "../sqlite/data/UserProfile";

export default async () => {
  signOut(auth)
    .then(() => DeleteUser())
    .finally(() => {
      console.log(
        `${window.localStorage.getItem("authUsername")} has disconnected!`
      );
      window.localStorage.setItem("authType", "");
      window.localStorage.setItem("authID", "");
      window.localStorage.setItem("authUsername", "");
      window.localStorage.setItem("authEmail", "");
    });
};
