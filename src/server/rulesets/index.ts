import { GetDocument } from "../firebase";
import { Validator } from "../../utils";

const reservedUsernames = ["Guest"];

const SignupValidator = {
  username: [
    new Validator(
      (value: string) =>
        value.length >= 4 &&
        value.length < 20 &&
        !reservedUsernames.includes(value),
      "Username must be 4 to 20 characters!",
      "warning"
    ),
  ],
  email: [
    new Validator(
      (value: string) =>
        value.match(
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        ) !== null,
      "Email must be valid",
      "danger"
    ),
  ],
  password: [
    new Validator(
      (value: string) => value.length >= 8,
      "Password must be at least 8 characters!",
      "danger"
    ),
  ],
};

const SigninValidator = {
  email: [
    new Validator(
      async (email: string) => {
        const temp = (await GetDocument("Accounts", email)).exists();
        console.log(temp);
        return temp;
      },
      "Email must be valid",
      "danger"
    ),
  ],
};

export { SignupValidator, SigninValidator };
