import { User, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../server/firebase";
import { SyncModels, InitializeModels } from "../models";
import {
  Enums as InformationEnums,
  Props as InformationProps,
} from "../models/Information";
import { SeedGenerator } from "../../utils";

const GuestData = {
  informationProps: {
    uid: SeedGenerator().toString(),
    email: "Guest",
    username: "Hooman",
    subscription: new InformationEnums.Subscription().guest,
    theme: new InformationEnums.Theme().yellow,
    mode: new InformationEnums.Mode().light,
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

const DatabaseInitialization = async (user?: User) => {
  const process: Promise<InformationProps> = !!user
    ? SyncModels(user.uid)
    : InitializeModels(GuestData.informationProps);

  return process.then((response: any) => {
    console.log("Database Initialization Successful!");
    return response;
  });
};

const WindowDatabaseInitialization = (props: InformationProps) => {
  console.log(props);
  window.localStorage.setItem("colorTheme", props.theme);
  window.localStorage.setItem("colorMode", props.mode);
  window.localStorage.setItem("authType", props.subscription);
  window.localStorage.setItem("authID", props.uid);
  window.localStorage.setItem("authUsername", props.username);
  window.localStorage.setItem("authEmail", props.email);
  console.log(`${props.username} has logged in.`);
};

export { FirebaseLogin, DatabaseInitialization, WindowDatabaseInitialization };
