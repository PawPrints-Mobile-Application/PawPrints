import { GetDocument } from "../firebase";

const SignupValidator = {
  username: {
    count: 8,
    validator: (value: string) => value.length >= 8,
  },
  email: (value: string) =>
    value.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    ) !== null,
  password: {
    count: 8,
    validator: (value: string) => value.length >= 8,
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
