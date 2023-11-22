export default class Age {
  birthday: Date;
  currentDate: Date = new Date();

  years: number = 0;
  months: number = 0;
  days: number = 0;

  constructor(birthday: Date, currentDate?: Date) {
    this.birthday = birthday;
    if (!!currentDate) this.currentDate = currentDate;
    this.process();
  }

  _StringFormatter = (value: number, label: string) =>
    `${value} ${label}${value > 1 ? "s" : ""}`;

  process = () => {
    const startDate = this.birthday;
    const currentDate = this.currentDate;

    this.years = currentDate.getFullYear() - startDate.getFullYear();
    this.months = currentDate.getMonth() - startDate.getMonth();
    this.days = currentDate.getDate() - startDate.getDate();

    // Adjust for negative months or days
    if (this.days < 0) {
      this.months--;
      const lastMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      this.days += lastMonthDate.getDate();
    }
    if (this.months < 0 && this.years < 0) {
      this.years--;
      this.months += 12;
    }

    return this.toString();
  };

  toString = () => {
    let temp = [];
    if (this.years > 0) {
      temp.push(this._StringFormatter(this.years, "year"));
    }
    if (this.months > 0) {
      temp.push(this._StringFormatter(this.months, "month"));
    }
    if (this.days > 0) {
      temp.push(this._StringFormatter(this.days, "day"));
    }

    if (temp.length === 2) {
      return temp.join(" and ");
    } else if (temp.length === 3) {
      return `${temp[0]}, ${temp[1]}, and ${temp[2]}`;
    }
    return temp[0];
  };
}
