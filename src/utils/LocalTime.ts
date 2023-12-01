const TwoCharactersFormat = (value: number) =>
  value < 10 ? `0${value}` : value;

export default class LocalTime {
  value: number = 0;
  minutes: number = 0;
  hours: number = 0;
  hoursConverted: number = 0;
  ampm: string = "";

  constructor(value: number | string) {
    this.Set(value);
  }

  Set(value: number | string) {
    if (typeof value === "string") {
      this.value = Number(value);
    } else {
      this.value = value;
    }
    this.toString();
  }

  toString(format: "24" | "12" = "12") {
    this.minutes = this.value % 100;
    this.hours = Math.floor(this.value / 100);
    this.hoursConverted = ((this.hours - 1) % 12) + 1;
    this.ampm = this.hours >= 12 && this.hours <= 23 ? " PM" : " AM";
    return `${TwoCharactersFormat(
      format === "12" ? this.hoursConverted : this.hours
    )}:${TwoCharactersFormat(this.minutes)}${format === "12" ? this.ampm : ""}`;
  }
}
