import { User } from "firebase/auth";
import { AuthState } from ".";

type Props = {
  email: string | null,
  uid: string,
  displayName: string | null
}

export const SigninProps = async (user: Props) => {
  window.localStorage.setItem('auth', !!user.email ? AuthState[1] : AuthState[2] );
  window.localStorage.setItem('userID', `${user.uid}`);
  window.localStorage.setItem('username', `${user.displayName}`);
  window.localStorage.setItem('email', `${user.email}`);
  console.log(`${user.displayName} has connected!`);
};

export default async (user: User) => await SigninProps({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email
});