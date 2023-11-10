import EnumConstructor from "../../utils/EnumConstructor";

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
  username: string;
  subscription: string;
  DTCreated: string;
}

class Model implements Props {
  uid: string;
  email: string;
  username: string;
  subscription: string;
  DTCreated: string;

  constructor(
    uid: string,
    email: string,
    username: string,
    subscription: string,
    DTCreated: string
  ) {
    this.uid = uid;
    this.email = email;
    this.username = username;
    this.subscription = subscription;
    this.DTCreated = DTCreated;
  }
}

export { Enums };
export type { Props };
export default Model;
