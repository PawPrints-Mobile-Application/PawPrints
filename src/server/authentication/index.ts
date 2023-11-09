import SigninUser from "./SigninUser";
import SignupUser from "./SignupUser";
import SignoutUser from "./SignoutUser";

import { Enums } from "../models/UserProfile";

const ConvertToDTSignin = (DSignin: string, TSignin: string) => `${DSignin} , ${TSignin}`;

const AuthType = Enums.Subscription;

export {
  SigninUser,
  SignupUser,
  SignoutUser,

  ConvertToDTSignin,

  AuthType
}