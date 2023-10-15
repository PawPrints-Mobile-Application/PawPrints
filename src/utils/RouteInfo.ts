

export default class RouteInfo {
    component: any;
    name: string;
    path: string;
    filename: string;
    meta = {
      requiresAuth: Boolean,
      requiresInternet: Boolean
    };
    icon: {
      default: string,
      active: string
    };
  
    public constructor(page: any){
      this.component = page;
      this.name = page.name;
      this.path = page.routeInfo.path;
      this.filename = page.routeInfo.filename;
      this.meta.requiresAuth = page.routeInfo.meta.requiresAuth;
      this.meta.requiresInternet = page.routeInfo.meta.requiresInternet;
      this.icon = page.routeInfo.icon;
    }
  }