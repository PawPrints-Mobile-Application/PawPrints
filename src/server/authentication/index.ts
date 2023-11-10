import {
  FirebaseRegistration,
  FirebaseVerification,
  FirebaseProfileUpdate,
  DatabaseRegistration,
} from "./SignupUser";
import {
  FirebaseLogin,
  DatabaseInitialization,
  WindowDatabaseInitialization,
} from "./SigninUser";
import {
  DatabaseTermination,
  WindowDatabaseTermination,
  FirebaseSignout,
} from "./SignoutUser";

import { Enums } from "../models/UserProfile";

const ConvertToDTSignin = (DSignin: string, TSignin: string) =>
  `${DSignin} , ${TSignin}`;

const AuthType = Enums.Subscription;

export {
  FirebaseRegistration,
  FirebaseVerification,
  FirebaseProfileUpdate,
  DatabaseRegistration,

  FirebaseLogin,
  DatabaseInitialization,
  WindowDatabaseInitialization,

  FirebaseSignout,
  DatabaseTermination,
  WindowDatabaseTermination,
  
  ConvertToDTSignin,
  AuthType,
};
