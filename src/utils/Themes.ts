import { ObjectToMap, PawprintsEvent, UserInfo } from ".";

const themes = {
  yellow: {
    light: {
      "primary-background": "#FEFEFE",
      "primary-text": "#0D0D0D",
      "secondary-background": "#E3F6F5",
      "secondary-text": "#0D0D0D",
      "secondary-dark-background": "#BAE8E8",
      "secondary-dark-text": "#0D0D0D",
      "tertiary-background": "#FFD803",
      "tertiary-text": "#0D0D0D",
      "quadratic-background": "#272343",
      "quadratic-text": "#FEFEFE",

      "button-middle-text": "#FFFFFE",
      "danger-background": "#EB445A",
      "danger-text": "#FFFFFE",
      "success-background": "#2DD36F",
      "success-text": "#FFFFFE",
      "button-icon": "#FFD803", // forums button in home
      "list-log-background": "rgba(255, 216, 3, 0.7)",
      "list-log-text": "#000000",
      "card-highlight-color": "#000000",
    },

    dark: {
      "primary-background": "#15202B",
      "primary-text": "#F7F9F9",
      "secondary-background": "#1E2732",
      "secondary-text": "#F7F9F9",
      "secondary-dark-background": "#1E2732",
      "secondary-dark-text": "#8A9197",
      "tertiary-background": "#FFE558",
      "tertiary-text": "#F7F9F9",
      "quadratic-background": "#07121D",
      "quadratic-text": "#F7F9F9",

      "button-middle-text": "#15202B",
      "danger-background": "#F7677B",
      "danger-text": "#FFFFFF",
      "success-background": "#56CF87",
      "success-text": "#FFFFFF",
      "button-icon": "#FFE558", // forums button in home
      "list-log-background": "rgba(60, 67, 76, 0.7)",
      "list-log-text": "#F7F9F9",
      "card-highlight-color": "#242D38",
    },
  },
  pink: {
    light: {
      "primary-background": "#FFFFFE",
      "primary-text": "#33272A",
      "secondary-background": "#EEF7FF",
      "secondary-text": "#33272A",
      "secondary-dark-background": "#C4CEDF",
      "secondary-dark-text": "#33272A",
      "tertiary-background": "#EC9CAF",
      "tertiary-text": "#0D0D0D",
      "quadratic-background": "#C7EAB4",
      "quadratic-text": "#33272A",

      "button-middle-text": "#FFFFFF",
      "danger-background": "#EE9DAE",
      "danger-text": "#FFFFFF",
      "success-background": "#AFE194",
      "success-text": "#FFFFFF",
      "button-icon": "#EC9CAF", // forums button in home
      "list-log-background": "rgba(255, 249, 196, 0.7)",
      "list-log-text": "#33272A",
      "card-highlight-color": "#33272A",
    },
    dark: {
      "primary-background": "#202020",
      "primary-text": "#FFFFFE",
      "secondary-background": "#EEF7FF",
      "secondary-text": "#202020",
      "secondary-dark-background": "#C4CEDF",
      "secondary-dark-text": "#202020",
      "tertiary-background": "#EC9CAF",
      "tertiary-text": "#FFFFFE",
      "quadratic-background": "#C7EAB4",
      "quadratic-text": "#202020",

      "button-middle-text": "#FFFFFF",
      "danger-background": "#EE9DAE",
      "danger-text": "#FFFFFF",
      "success-background": "#AFE194",
      "success-text": "#FFFFFF",
      "button-icon": "#EC9CAF", // forums button in home
      "list-log-background": "rgba(255, 249, 196, 0.7)",
      "list-log-text": "#202020",
      "card-highlight-color": "#202020",
    },
  },
  blue: {
    light: {
      "primary-background": "#DBEBF5",
      "primary-text": "#000000",
      "secondary-background": "#7FA4BF",
      "secondary-text": "#000000",
      "secondary-dark-background": "#7FA4BF",
      "secondary-dark-text": "#000000",
      "tertiary-background": "#0D3B5C",
      "tertiary-text": "#000000",
      "quadratic-background": "#1E5074",
      "quadratic-text": "#FFFFFF",

      "button-middle-text": "#DBEBF5",
      "danger-background": "#0D3B5C",
      "danger-text": "#FFFFFE",
      "success-background": "#F5D473",
      "success-text": "#FFFFFE",
      "button-icon": "#F5D473", // forums button in home
      "list-log-background": "rgba(255, 255, 255, 0.7)",
      "list-log-text": "#000000",
      "card-highlight-color": "#000000",
    },

    dark: {
      "primary-background": "#0D0D0D",
      "primary-text": "#FEFEFE",
      "secondary-background": "#1E4F71",
      "secondary-text": "#FEFEFE",
      "secondary-dark-background": "#29516D",
      "secondary-dark-text": "#FEFEFE",
      "tertiary-background": "#0D3B5C",
      "tertiary-text": "#FEFEFE",
      "quadratic-background": "#042944",
      "quadratic-text": "#FEFEFE",

      "button-middle-text": "#FEFEFE",
      "danger-background": "#0D3B5C",
      "danger-text": "#FEFEFE",
      "success-background": "#328F65",
      "success-text": "#FEFEFE",
      "button-icon": "#328F65", // forums button in home
      "list-log-background": "rgba(135, 158, 173,0.7)",
      "list-log-text": "#FEFEFE",
      "card-highlight-color": "#14354D",
    },
  },
};

const Set = (value: string) => {
  const theme = value.split(" | ").map((value) => value.trim());
  const colors: Map<string, string> = ObjectToMap(
    ObjectToMap(ObjectToMap(themes).get(theme[0])).get(theme[1])
  );
  if (!colors) return;
  colors.forEach((value, key) => {
    document.documentElement.style.setProperty(`--theme-${key}`, value);
  });
  PawprintsEvent.EventDispatcher("modified", "themes");
  UserInfo.SetTheme(theme[0], theme[1]);
};

const Get = () => {
  const temp = UserInfo.GetTheme().split(" | ");
  const theme = temp[0];
  const mode = temp[1];
  return { theme, mode };
};

export default { themes, Set, Get };
