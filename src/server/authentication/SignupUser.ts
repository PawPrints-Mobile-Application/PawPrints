import {
  sendEmailVerification,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import auth from "../firebase";
import { SetDocument } from "../firebase";
import { CreateUser, ConvertToDTSignin } from "../sqlite/data/Cache/Accounts";
import { Hash } from "../../utils";
import SigninUser from "./SigninUser";

type Form = {
  username: string;
  email: string;
  password: string;
  acceptTOS: boolean;
};

const SignupUser = async (form: Form) =>
  Hash.sha256(form.password).then(async (value) => {
    console.log("Password Hashed!");
    form.password = Hash.ArrayBufferToString(value);
    return createUserWithEmailAndPassword(auth, form.email, form.password)
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

        const localDatabase = await CreateUser({
          email: form.email,
          password: form.password,
          uid: userID,
          username: form.username,
          accountType: 1,
          DTCreated: DTCreated,
        })
          .then(() => console.log("Local Database Successful"))
          .catch((error) => console.log(error.message));

        return Promise.all([
          firebaseVerification,
          firebaseProfileUpdate,
          firebaseDatabase,
          localDatabase,
        ]).catch((error) => console.log(error.message));
      })
      .then(
        async () =>
          await SigninUser(
            {
              email: form.email,
              password: form.password,
            },
            true
          )
      );
  });

export default SignupUser;
