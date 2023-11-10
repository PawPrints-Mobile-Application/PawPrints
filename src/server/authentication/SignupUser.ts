import {
  sendEmailVerification,
  updateProfile,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import auth from "../firebase";
import {
  Set as InformationSet,
  Enums as InformationEnums,
  Props as InformationProps,
} from "../models/Information";

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

const DatabaseRegistration = (user: User) => {
  const informationProps: InformationProps = {
    uid: user.uid,
    email: user.email!,
    username: user.displayName!,
    subscription: new InformationEnums.Subscription().free,
  };

  const informationData = InformationSet(informationProps);
  return Promise.all([informationData]).then(() => {
    console.log("Database Initialization Successful!");
    return informationProps;
  });
};

export {
  FirebaseRegistration,
  FirebaseVerification,
  FirebaseProfileUpdate,
  DatabaseRegistration,
};
