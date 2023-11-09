import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../server/firebase";
import { AuthType } from ".";
import { ChangeUser } from "../sqlite/data/UserProfile";

type Props = {
  email: string;
  uid: string;
  displayName: string;
  subscription: string;
} | null;

const SigninUser = async (
  form: { email: string; password: string } | null = null
) => {
  let props: Props = null;
  let tempUID = new Date()[Symbol.toPrimitive]("number").toString();
  return new Promise((resolve, reject) => {
    if (!!form) {
      signInWithEmailAndPassword(auth, form!.email, form!.password)
        .then((userCredential) => {
          props = {
            email: userCredential.user.email!,
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName!,
            subscription: new AuthType().free,
          };
          tempUID = props.uid;
          console.log("Firebase Login Successful");
          resolve(null);
        })
        .catch((error) => reject(error));
    } else {
      resolve(null);
      console.log("Guest Login Successful");
    }
  })
    .then(async () => {
      if (!props) {
        props = {
          uid: tempUID,
          email: "Guest",
          displayName: "Hooman",
          subscription: new AuthType().guest,
        };
      }

      return await ChangeUser(props);
    })
    .then(() => {
      window.localStorage.setItem("authType", props!.subscription);
      window.localStorage.setItem("authID", `${props!.uid}`);
      window.localStorage.setItem("authUsername", `${props!.displayName}`);
      window.localStorage.setItem("authEmail", `${props!.email}`);
      console.log(`${props!.displayName} has logged in.`);
    });
};

export default SigninUser;
