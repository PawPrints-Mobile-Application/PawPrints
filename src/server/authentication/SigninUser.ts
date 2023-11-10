import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../server/firebase";
import { AuthType, ConvertToDTSignin } from ".";
import { ChangeUser } from "../sqlite/data/UserProfile";
import { GetUserProfile } from "../firebase/data/Users";

const SigninUser = async (
  form: { email: string; password: string } | null = null
) => {
  let props = {
    uid: new Date()[Symbol.toPrimitive]("number").toString(),
    email: "Guest",
    username: "Hooman",
    subscription: new AuthType().guest,
    DTCreated: ConvertToDTSignin(
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    ),
  };

  return new Promise((resolve, reject) => {
    if (!!form) {
      signInWithEmailAndPassword(auth, form!.email, form!.password)
        .then((userCredential) => (props.uid = userCredential.user.uid))
        .then(() => GetUserProfile(props.uid))
        .then((userProfile) => {
          props = userProfile;
          console.log("Firebase Login Successful");
          resolve(null);
        })
        .catch((error) => reject(error));
    } else {
      resolve(null);
      console.log("Guest Login Successful");
    }
  })
    .then(() => ChangeUser(props))
    .then(() => {
      window.localStorage.setItem("authType", props!.subscription);
      window.localStorage.setItem("authID", `${props!.uid}`);
      window.localStorage.setItem("authUsername", `${props!.username}`);
      window.localStorage.setItem("authEmail", `${props!.email}`);
      console.log(`${props!.username} has logged in.`);
    });
};

export default SigninUser;
