import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../server/firebase";
import { LoginUser } from "../sqlite/data/Cache/LoginHistory";
import { Hash } from "../../utils";
import { AuthType } from ".";

type Props = {
  email: string;
  uid: string;
  displayName: string;
} | null;

const SigninUser = async (
  form: { email: string; password: string } | null = null,
  hashed: Boolean = false
) => {
  let props: Props = null;
  let tempUID = new Date()[Symbol.toPrimitive]("number").toString();
  return new Promise((resolve, reject) => {
    if (!!form) {
      Hash.sha256(form.password)
        .then(async (value) => {
          if (!hashed) {
            form.password = Hash.ArrayBufferToString(value);
          }
        })
        .then(async () =>
          signInWithEmailAndPassword(auth, form!.email, form!.password)
            .then((userCredential) => {
              props = {
                email: userCredential.user.email!,
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName!,
              };
              tempUID = props.uid;
              console.log("Firebase Login Successful");
              resolve(null);
            })
            .catch((error) => reject(error))
        );
    } else resolve(null);
  })
    .then(() => {
      LoginUser({
        DSignin: new Date().toLocaleDateString(),
        TSignin: new Date().toLocaleTimeString(),
        uid: tempUID,
      });
    })
    .then(() => {
      console.log("Login History Update Succesful");
      const authType = !!props ? new AuthType().free : new AuthType().guest;
      const authUsername = !!props ? props.displayName : "Hooman";
      const authEmail = !!props ? props.email : "Guest";
      window.localStorage.setItem("authType", authType);
      window.localStorage.setItem("authID", `${tempUID}`);
      window.localStorage.setItem("authUsername", `${authUsername}`);
      window.localStorage.setItem("authEmail", `${authEmail}`);
      console.log(`${authUsername} has logged in.`);
    });
};

export default SigninUser;
