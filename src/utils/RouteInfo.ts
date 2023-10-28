export default class RouteInfo {
  name: string;
  path: string;
  filePath: string;
  meta: {
    requiresAuth: boolean;
  } = {
    requiresAuth: false,
  };
  icons: {
    default: string;
    active: string;
  };

  public constructor(
    name: string,
    path: string,
    parent: string,
    requiresAuth: boolean = false,
    icons: { default: string; active: string } = { default: "", active: "" }
  ) {
    this.name = name;
    this.path = path;
    this.filePath = './views/' + parent + name + '.vue';
    this.meta.requiresAuth = requiresAuth;
    this.icons = icons;
  }
}
