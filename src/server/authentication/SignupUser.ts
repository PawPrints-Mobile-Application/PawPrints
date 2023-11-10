import {
  sendEmailVerification,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import auth from "../firebase";
import { SetDocument } from "../firebase";
import SigninUser from "./SigninUser";
import { AuthType, ConvertToDTSignin } from ".";
import { defaultsPreferences } from "../models";

type Form = {
  username: string;
  email: string;
  password: string;
};

const SignupUser = async (form: Form) =>
  createUserWithEmailAndPassword(auth, form.email, form.password)
    .then(async (userCredential) => {
      console.log("Firebase signup succesful!");
      const user = userCredential.user;

      // Firestore Verification
      const firebaseVerification = await sendEmailVerification(user)
        .then(() => console.log("Verification Successful"))
        .catch((error) => console.log(error.message));
      const firebaseProfileUpdate = await updateProfile(user, {
        displayName: form.username,
      })
        .then(() => console.log("User Update Successful"))
        .catch((error) => console.log(error.message));

      const DCreated = new Date().toLocaleDateString();
      const TCreated = new Date().toLocaleTimeString();
      const DTCreated = ConvertToDTSignin(DCreated, TCreated);
      const userID = user.uid;

      const userData = {
        uid: userID,
        email: form.email,
        username: form.username,
        subscription: new AuthType().free,
        DTCreated: DTCreated,
      }

      // Update Firestore Database of new user
      const AccountRegistry = await SetDocument("Accounts", form.email, userData)
        .then(() => console.log("Account Registry Successful"))
        .catch((error) => console.log(error.message));

      // Update Firestore Database of new user
      const AccountCloud = await SetDocument("Users", userID, {
        UserProfile: userData,
        Preferences: defaultsPreferences
      })
        .then(() => console.log("Account Cloud Successful"))
        .catch((error) => console.log(error.message));

      return Promise.all([
        firebaseVerification,
        firebaseProfileUpdate,
        AccountRegistry,
        AccountCloud,
      ]).catch((error) => console.log(error.message));
    })
    .then(
      async () =>
        await SigninUser({
          email: form.email,
          password: form.password,
        })
    );

export default SignupUser;
