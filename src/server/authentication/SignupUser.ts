import {
  sendEmailVerification,
  updateProfile,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import auth from "../firebase";
import { Enums as InformationEnums } from "../models/Information";
import { InitializeModels } from "../models";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

type Form = {
  username: string;
  email: string;
  password: string;
};

const FirebaseRegistration = (form: Form) =>
  createUserWithEmailAndPassword(auth, form.email, form.password).then(
    (userCredential) => {
      console.log("Firebase Registration Successful!");
      return userCredential.user;
    }
  );

const FirebaseVerification = (user: User) =>
  sendEmailVerification(user).then(() => {
    console.log("Firebase Verification Successful!");
    return user;
  });

const FirebaseProfileUpdate = (
  user: User,
  {
    displayName,
    photoURL,
  }: {
    displayName?: string;
    photoURL?: string;
  }
) =>
  updateProfile(user, { displayName, photoURL }).then(() => {
    console.log("Firebase Profile Updated Successfully!");
    return user;
  });

const DatabaseRegistration = async (db: SQLiteDBConnection, user: User) =>
  InitializeModels(db, {
    uid: user.uid,
    email: user.email!,
    username: user.displayName!,
    subscription: InformationEnums.Subscription.free,
    theme: InformationEnums.Theme.yellow,
    mode: InformationEnums.Mode.light,
    avatar: 2,
  });

export {
  FirebaseRegistration,
  FirebaseVerification,
  FirebaseProfileUpdate,
  DatabaseRegistration,
};
