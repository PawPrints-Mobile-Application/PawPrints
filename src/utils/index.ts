import RouteInfo from "./RouteInfo";
import EnumConstructor from "./EnumConstructor";
import * as Hash from "./Hash";
import SeedGenerator from "./SeedGenerator";
import Age from "./Age";
import StringToArray from "./StringToArray";

import HelperConstructor from "./HelperConstructor";
import InputValidator from "./InputValidator";

const GetScreenSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
}

export {
  RouteInfo,
  EnumConstructor,
  Hash,
  SeedGenerator,
  Age,
  StringToArray,

  HelperConstructor,
  InputValidator,

  GetScreenSize
}
