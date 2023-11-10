import { User, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../server/firebase";
import {
  Sync as InformationSync,
  Set as InformationSet,
  Enums as InformationEnums,
  Props as InformationProps,
} from "../models/Information";

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

const DatabaseInitialization = (user?: User) => {
  const informationProps: InformationProps = {
    uid: new Date()[Symbol.toPrimitive]("number").toString(),
    email: "Guest",
    username: "Hooman",
    subscription: new InformationEnums.Subscription().guest,
  };

  const informationData = !!user
    ? InformationSync(user.uid)
    : InformationSet(informationProps, false);
  return informationData.then((response: any) => {
    console.log("Database Initialization Successful!");
    return response;
  });
};

const WindowDatabaseInitialization = (props: InformationProps) => {
  window.localStorage.setItem("authType", props.subscription);
  window.localStorage.setItem("authID", `${props.uid}`);
  window.localStorage.setItem("authUsername", `${props.username}`);
  window.localStorage.setItem("authEmail", `${props.email}`);
  console.log(`${props.username} has logged in.`);
};

export { FirebaseLogin, DatabaseInitialization, WindowDatabaseInitialization };
