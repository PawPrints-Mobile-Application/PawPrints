import { User, sendEmailVerification, updateProfile } from 'firebase/auth';
import { SetDocument } from '../firebase';
import SigninUser from './SigninUser';

type Form = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
    acceptTOS: boolean;
}

export default async (form: Form, user: User) => {
  // Firestore Verification
  await sendEmailVerification(user).catch((error) => console.log(error.message));
  await updateProfile(user, {displayName: form.username}).catch((error) => console.log(error.message));
  console.log(`${user.displayName} has been successfully registered and verified to Firebase!`);

  const DTCreated = new Date().toLocaleString();
  const userID = user.uid;

  // Update Firestore Database of new user
  await SetDocument('Accounts', form.email, {
    DTCreated: DTCreated,
    email: form.email,
    password: form.password,
    uid: userID,
    username: form.username,
    firstName: form.firstName,
    lastName: form.lastName
  });

  await SigninUser(user);
};