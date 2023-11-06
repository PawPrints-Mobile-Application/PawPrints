

export {
  
}

export default class EnumConstructor {
  values: Array<any>;

  constructor(values: Array<any>) {
    this.values = values;
  }

  get(value: any) {
    if (!this.values.includes(value)) return null;
    return this.values[this.values.indexOf(value)];
  }

  find(value: number) {
    if (value >= this.values.length || value <= -1) return null;
    return this.values[value];
  }

  indexOf(value: any) {
    return this.values.indexOf(value);
  }
}