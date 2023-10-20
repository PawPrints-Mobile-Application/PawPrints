import { GetDocument } from "../firebase";

const reservedUsernames = ['Guest'];

const SignupValidator = {
  username: {
    validator: (value: string) => value.length >= 4 && value.length < 10 && !reservedUsernames.includes(value),
    helperText: 'Password must be 4 to 10 characters!'
  },
  email: (value: string) =>
    value.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    ) !== null,
  password: {
    validator: (value: string) => value.length >= 8,
    helperText: 'Password must be at least 8 characters!'
  },
};

const SigninValidator = {
  email: async (email: string) => {
    const temp = (await GetDocument("Accounts", email)).exists();
    console.log(temp);
    return temp;
  },
};

export { SignupValidator, SigninValidator };
