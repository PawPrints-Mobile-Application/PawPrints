import RouteInfo from "./RouteInfo";

const GetScreenSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
}

export {
  RouteInfo,

  GetScreenSize
}
