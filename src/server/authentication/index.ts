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

const ConvertToDTSignin = (DSignin: string, TSignin: string) =>
  `${DSignin} , ${TSignin}`;

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
};
