import EnumConstructor from "..";

class Subscription extends EnumConstructor {
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

const Enums = { Subscription };

interface Props {
  uid: string;
  email: string;
  password: string;
  subscription: number;
}

class Model implements Props {
  uid: string;
  email: string;
  password: string;
  subscription: number;

  constructor(
    uid: string,
    email: string,
    password: string,
    subscription: number
  ) {
    this.uid = uid;
    this.email = email;
    this.password = password;
    this.subscription = subscription;
  }
}

export { Enums };
export type { Props };
export default Model;
