import { TwoCharactersFormat } from ".";
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
      if (value.indexOf(":") === -1) {
        this.value = Number(value);
      } else {
        const colonIdx = value.indexOf(":");
        const hoursConverted = Number(value.substring(0, colonIdx));
        const minutes = Number(value.substring(colonIdx + 1, colonIdx + 3));
        const ampm = value.indexOf("PM") === -1 ? "AM" : "PM";
        let hours = hoursConverted + (ampm === "AM" ? 0 : 12);
        if (hoursConverted === 12) hours = 12;
        this.value = Number(
          `${TwoCharactersFormat(hours)}${TwoCharactersFormat(minutes)}`
        );
      }
    } else {
      this.value = value;
    }
    this.toString();
  }

  toString(format: "24" | "12" = "12") {
    this.minutes = this.value % 100;
    this.hours = Math.floor(this.value / 100);
    this.hoursConverted = ((this.hours + 11) % 12) + 1;
    this.ampm = this.hours >= 12 && this.hours <= 23 ? "PM" : "AM";
    return `${TwoCharactersFormat(
      format === "12" ? this.hoursConverted : this.hours
    )}:${TwoCharactersFormat(this.minutes)}${
      format === "12" ? " " + this.ampm : ""
    }`;
  }
}
