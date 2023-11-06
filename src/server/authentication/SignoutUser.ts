import { LogoutUser } from "../sqlite/data/Cache/LoginHistory";
import { signOut } from "firebase/auth";
import auth from "../firebase";

export default async () => {
  signOut(auth)
    .finally(() => LogoutUser(new Date().toLocaleString()))
    .then(() => {
      console.log(
        `${window.localStorage.getItem("authUsername")} has disconnected!`
      );
      window.localStorage.setItem("authType", "");
      window.localStorage.setItem("authID", "");
      window.localStorage.setItem("authUsername", "");
      window.localStorage.setItem("authEmail", "");
    });
};
