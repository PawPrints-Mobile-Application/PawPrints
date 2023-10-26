const primary = "primary";
const secondary = "secondary";
const tertiary = "secondary";

const success = "success";
const warning = "warning";
const danger = "danger";

const light = "light";
const dark = "dark";
const medium = "medium";

const Colors: Color = {
  primary: primary,
  secondary: secondary,
  tertiary: tertiary,

  success: success,
  warning: warning,
  danger: danger,

  light: light,
  dark: dark,
  medium: medium,
};

const colors : Array<string> = [
  primary,
  secondary,
  tertiary,
  success,
  warning,
  danger,
  light,
  dark,
  medium,
];

type Color = {
  primary: string,
  secondary: string,
  tertiary: string,
  success: string,
  warning: string,
  danger: string,
  light: string,
  dark: string,
  medium: string
}

class Light implements Color {
  primary = primary;
  secondary = secondary;
  tertiary = tertiary;

  success = success;
  warning = warning;
  danger = danger;

  light = light;
  dark = dark;
  medium = medium;
}

class Dark implements Color {
  primary = primary;
  secondary = secondary;
  tertiary = tertiary;

  success = success;
  warning = warning;
  danger = danger;

  light = light;
  dark = dark;
  medium = medium;
}

const Theme = {
  'Light': new Light(),
  'Dark': new Dark()
};

export {
  primary,
  secondary,
  tertiary,
  success,
  warning,
  danger,
  light,
  dark,
  medium,

  colors,

  Theme,
  Light,
  Dark
};

export default Colors;
