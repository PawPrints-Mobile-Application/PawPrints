import { User } from "firebase/auth";
import { AuthType } from ".";
import { LoginUser } from "../sqlite/models/Cache/LoginHistory";

type Props = {
  email: string | null;
  uid: string;
  displayName: string | null;
};

export const SigninProps = async (
  user: Props,
  DSignin: string,
  TSignin: string
) =>
  LoginUser({
    DSignin: DSignin,
    TSignin: TSignin,
    uid: user.uid,
  }).then(() => {
    console.log(!!user.email ? AuthType[2] : AuthType[1]);
    window.localStorage.setItem(
      "authType",
      !!user.email ? AuthType[2] : AuthType[1]
    );
    window.localStorage.setItem("authID", `${user.uid}`);
    window.localStorage.setItem("authUsername", `${user.displayName}`);
    window.localStorage.setItem("authEmail", `${user.email}`);
    console.log(`${user.displayName} has connected!`);
  });

export default async (user: User, DSignin: string, TSignin: string) =>
  await SigninProps(
    {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    },
    DSignin,
    TSignin
  );
