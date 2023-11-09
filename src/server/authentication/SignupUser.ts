import {
  sendEmailVerification,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import auth from "../firebase";
import { SetDocument } from "../firebase";
import SigninUser from "./SigninUser";
import { ConvertToDTSignin } from ".";

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
      // Update Firestore Database of new user
      const firebaseDatabase = await SetDocument("Accounts", form.email, {
        DTCreated: DTCreated,
        email: form.email,
        password: form.password,
        uid: userID,
      })
        .then(() => console.log("Firebase Database Successful"))
        .catch((error) => console.log(error.message));

      return Promise.all([
        firebaseVerification,
        firebaseProfileUpdate,
        firebaseDatabase,
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
