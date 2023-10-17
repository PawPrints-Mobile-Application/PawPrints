import SigninUser from "./SigninUser";
import SignupUser from "./SignupUser";
import SignoutUser from "./SignoutUser";

const AuthState = {
  0: 'None',
  1: 'Guest',
  2: 'Verified'
}

export {
  SigninUser,
  SignupUser,
  SignoutUser,

  AuthState
}