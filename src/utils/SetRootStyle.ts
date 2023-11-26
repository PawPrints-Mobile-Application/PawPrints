import { ObjectToMap } from ".";
import themes from "../theme";

export default function SetRootStyle(
  theme: string = "yellow",
  mode: string = "light"
) {
  switch (theme) {
    case "pink":
      SetStyle(ObjectToMap(themes.pinkLight));
      break;
    case "blue":
      SetStyle(ObjectToMap(themes.blueLight));
      break;
    default:
      SetStyle(ObjectToMap(themes.yellowLight));
      break;
  }
}

const SetStyle = (map: Map<string, string>) =>
  map.forEach((value, key) =>
    document.documentElement.style.setProperty(`--theme-${key}`, value)
  );
