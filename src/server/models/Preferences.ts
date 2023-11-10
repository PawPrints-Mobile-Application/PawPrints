import EnumConstructor from "../../utils/EnumConstructor";

class Theme extends EnumConstructor {
  light: string;
  dark: string;

  constructor() {
    super(["light", "dark"]);
    this.light = this.values[0];
    this.dark = this.values[1];
  }
}
class Length extends EnumConstructor {
  meter: string;
  feet: string;

  constructor() {
    super(["meter", "feet"]);
    this.meter = this.values[0];
    this.feet = this.values[1];
  }
}
class Weight extends EnumConstructor {
  kilogram: string;
  pound: string;

  constructor() {
    super(["kilogram", "pound"]);
    this.kilogram = this.values[0];
    this.pound = this.values[1];
  }
}
class Temperature extends EnumConstructor {
  celsius: string;
  fahrenheit: string;

  constructor() {
    super(["celsius", "fahrenheit"]);
    this.celsius = this.values[0];
    this.fahrenheit = this.values[1];
  }
}

const Enums = { Theme, Length, Weight, Temperature };

interface Props {
  theme: string;
  length: string;
  weight: string;
  temperature: string;
}

const defaults = {
  theme: new Theme().values[0],
  length: new Length().values[0],
  weight: new Weight().values[0],
  temperature: new Temperature().values[0],
};

class Model implements Props {
  uid: string;
  theme: string;
  length: string;
  weight: string;
  temperature: string;

  constructor(
    uid: string,
    theme: string,
    length: string,
    weight: string,
    temperature: string
  ) {
    this.uid = uid;
    this.theme = theme;
    this.length = length;
    this.weight = weight;
    this.temperature = temperature;
  }
}

export { Enums, defaults };
export type { Props };
export default Model;
