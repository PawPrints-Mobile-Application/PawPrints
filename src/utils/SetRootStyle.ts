import { ObjectToMap } from ".";

export default function SetRootStyle(map: Object) {
  ObjectToMap(map).forEach((value, key) =>
    document.documentElement.style.setProperty(`--theme-${key}`, value)
  );
}
