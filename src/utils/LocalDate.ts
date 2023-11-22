type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY/MM/DD";

const TwoCharactersFormat = (value: number) =>
  value < 10 ? `0${value}` : value;

export default class LocalDate {
  month: number = 1;
  date: number = 1;
  year: number = 1;
  day: number = 1;
  value: Date = new Date();

  constructor(_value?: Date) {
    this.set(_value);
  }

  GetDate = () => new Date(this.value);

  set(_value?: Date) {
    if (!_value) this.value = new Date();
    else this.value = _value;
    this.month = this.value.getMonth() + 1;
    this.date = this.value.getDate();
    this.year = this.value.getFullYear();
    this.day = this.value.getDay();
  }

  toString = () => this.value.toString();
  toDateString = () => this.value.toDateString();
  toLocaleString = () => this.value.toLocaleString();
  toLocaleDateString = (
    format: DateFormat = "MM/DD/YYYY",
    separator: "/" | "-" = "/"
  ) =>
    format
      .split("/")
      .map((sector) => {
        let temp = this.year;
        if (sector === "MM") temp = this.month;
        else if (sector === "DD") temp = this.date;
        return TwoCharactersFormat(temp);
      })
      .join(separator);
}
