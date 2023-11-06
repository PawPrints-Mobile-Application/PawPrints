import EnumConstructor from "..";

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
    uid: string,
    theme: string,
    length: number,
    weight: number,
    temperature: number
}

class Model implements Props {
    uid: string;
    theme: string;
    length: number;
    weight: number;
    temperature: number;

  constructor(
    uid: string,
    theme: string,
    length: number,
    weight: number,
    temperature: number
  ) {
    this.uid = uid;
    this.theme = theme;
    this.length = length;
    this.weight = weight;
    this.temperature = temperature;
  }
}

export { Enums };
export type { Props };
export default Model;
