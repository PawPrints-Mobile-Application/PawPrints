import EnumConstructor from "..";

class AccountType extends EnumConstructor {
  guest: string;
  free: string;
  pawmium: string;

  constructor() {
    super(["guest", "free", "pawmium"]);
    this.guest = this.values[0];
    this.free = this.values[1];
    this.pawmium = this.values[2];
  }
}

const Enums = { AccountType };

interface Props {
    email: string,
    uid: string,
    username: string,
    password: string,
    accountType: number,
    DTCreated: string
}

class Model implements Props {
    email: string;
    uid: string;
    username: string;
    password: string;
    accountType: number;
    DTCreated: string;

  constructor(
    email: string,
    uid: string,
    username: string,
    password: string,
    accountType: number,
    DTCreated: string
  ) {
    this.uid = uid;
    this.email = email;
    this.username = username;
    this.password = password;
    this.accountType = accountType;
    this.DTCreated = DTCreated;
  }
}

export { Enums };
export type { Props };
export default Model;
