import { User, sendEmailVerification, updateProfile } from "firebase/auth";
import { SetDocument } from "../firebase";
import SigninUser from "./SigninUser";
import { CreateUser, ConvertToDTSignin } from "../sqlite/models/Cache/Accounts";
import { Hash } from "../../utils";

type Form = {
  username: string;
  email: string;
  password: string;
  showPassword: boolean;
  acceptTOS: boolean;
};

export default async (
  form: Form,
  user: User,
  accountType: number,
  DCreated: string,
  TCreated: string,
) => {
  let newForm = form;
  Hash.sha256(form.password).then((value) => {
    newForm.password = Hash.ArrayBufferToString(value);
  });

  // Firestore Verification
  const firebaseVerification = await sendEmailVerification(user).catch(
    (error) => console.log(error.message)
  );
  const firebaseProfileUpdate = await updateProfile(user, { displayName: newForm.username }).catch((error) =>
    console.log(error.message)
  );
  console.log(
    `${user.displayName} has been successfully registered and verified to Firebase!`
  );

  const DTCreated = ConvertToDTSignin(DCreated, TCreated);
  const userID = user.uid;
  // Update Firestore Database of new user
  const firebaseDatabase = await SetDocument("Accounts", newForm.email, {
    DTCreated: DTCreated,
    email: newForm.email,
    password: newForm.password,
    uid: userID,
  }).catch((error) => console.log(error.message));

  const localDatabase = await CreateUser({
    email: newForm.email,
    password: newForm.password,
    uid: userID,
    username: newForm.username,
    accountType: accountType,
    DTCreated: DTCreated,
  }).catch((error) => console.log(error.message));

  Promise.all([firebaseVerification,firebaseProfileUpdate,firebaseDatabase,localDatabase]).catch((error) => console.log(error.message)).finally(async () => await SigninUser(user, DCreated, TCreated));
};
