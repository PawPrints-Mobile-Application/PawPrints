import SigninUser from "./SigninUser";
import SignupUser from "./SignupUser";
import SignoutUser from "./SignoutUser";

const AuthType = {
  0: 'None',
  1: 'Guest',
  2: 'Free',
  3: 'Pawmium'
}

export {
  SigninUser,
  SignupUser,
  SignoutUser,

  AuthType
}