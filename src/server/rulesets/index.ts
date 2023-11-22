// import { GetDocument } from "../firebase";
import { InputValidator } from "../../utils";

const reservedUsernames = ["Guest"];

const StringMinMax = (value: string, min: number, max: number = -1) => value.length >= min && (max === -1 || value.length <= max);
const EmailFormatDetector = (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
const UpperCaseDetector = (value: string) => /[A-Z]/.test(value);
const LowerCaseDetector = (value: string) => /[a-z]/.test(value);
const NumberDetector = (value: string) => /\d/.test(value);
const SpecialCharacterDetector = (value: string) =>
  /[^a-zA-Z0-9\s]/.test(value);

const SignupValidator = {
  username: [
    new InputValidator(
      (value: string) =>
        StringMinMax(value, 4, 30) && !reservedUsernames.includes(value),
      "Must be 4 to 20 characters!",
      "danger"
    ),
  ],
  email: [
    new InputValidator(
      (value: string) =>
        EmailFormatDetector(value),
      "Email must be valid",
      "danger"
    ),
  ],
  password: [
    new InputValidator(
      (value: string) => StringMinMax(value, 8),
      "Password must be at least 8 characters!",
      "danger"
    ),
    new InputValidator(
      (value: string) =>
      LowerCaseDetector(value),
      "Must have at least one lowercase letter!",
      "danger"
    ),
    new InputValidator(
      (value: string) =>
      NumberDetector(value),
      "Must have at least one number!",
      "danger"
    ),
    new InputValidator(
      (value: string) =>
      UpperCaseDetector(value),
      "Could have at least one uppercase letter!",
      "warning"
    ),
    new InputValidator(
      (value: string) =>
      SpecialCharacterDetector(value),
      "Could have at least one special character!",
      "warning"
    ),
  ],
};

const SigninValidator = {
  email: [
    // new InputValidator(
    //   async (email: string) => {
    //     const temp = (await GetDocument("Accounts", email)).exists();
    //     console.log(temp);
    //     return temp;
    //   },
    //   "Email must be valid",
    //   "danger"
    // ),
    new InputValidator(
      (value: string) =>
        EmailFormatDetector(value),
      "Email must be valid",
      "danger"
    ),
  ],
};

export { SignupValidator, SigninValidator };
