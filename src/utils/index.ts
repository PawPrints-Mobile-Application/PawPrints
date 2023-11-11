import RouteInfo from "./RouteInfo";
import * as Hash from "./Hash";
import SeedGenerator from "./SeedGenerator";

const GetScreenSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
}

export {
  RouteInfo,
  Hash,
  SeedGenerator,

  GetScreenSize
}
