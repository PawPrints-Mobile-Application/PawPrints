import { User } from "firebase/auth";
import { AuthType } from ".";

type Props = {
  email: string | null,
  uid: string,
  displayName: string | null
}

export const SigninProps = async (user: Props) => {
  window.localStorage.setItem('authType', !!user.email ? AuthType[1] : AuthType[2] );
  window.localStorage.setItem('authID', `${user.uid}`);
  window.localStorage.setItem('authUsername', `${user.displayName}`);
  window.localStorage.setItem('authEmail', `${user.email}`);
  console.log(`${user.displayName} has connected!`);
};

export default async (user: User) => await SigninProps({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email
});