import EnumConstructor from ".";

class InOutdoor extends EnumConstructor {
  indoor: string;
  outdoor: string;

  constructor() {
    super(["indoor", "outdoor"]);
    this.indoor = this.values[0];
    this.outdoor = this.values[1];
  }
}
class Fixing extends EnumConstructor {
  none: string;
  neutered: string;
  spayed: string;

  constructor() {
    super(["none", "neutered", "spayed"]);
    this.none = this.values[0];
    this.neutered = this.values[1];
    this.spayed = this.values[2];
  }
}

const Enums = {
  InOutdoor,
  Fixing,
};

interface Props {
  pid: string;
  uid: string;
  name: string;
  birthday: string;
  breed: string;
  color: string;
  inoutdoor: number;
  fixing: number;
}

class Model implements Props {
  pid: string;
  uid: string;
  name: string;
  birthday: string;
  breed: string;
  color: string;
  inoutdoor: number;
  fixing: number;

  constructor(
    uid: string,
    name: string,
    birthday: string,
    breed: string,
    color: string,
    inoutdoor: number,
    fixing: number
  ) {
    this.uid = uid;
    this.pid = uid + new Date()[Symbol.toPrimitive]("number").toString();
    this.name = name;
    this.birthday = birthday;
    this.breed = breed;
    this.color = color;
    this.inoutdoor = inoutdoor;
    this.fixing = fixing;
  }
}

export { Enums };
export type { Props };
export default Model;
