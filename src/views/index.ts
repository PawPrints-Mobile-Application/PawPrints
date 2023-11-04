import navigationRoutes, { children as navigationChildren } from "./navigation";
import templateRoutes from "./templates";
import transitionRoutes from "./transitions";

const routes = ["Auth", "Test"].map((child) => {
  return {
    name: child,
    path: `/${child}`,
    meta: { requiresAuth: true },
    parent: "",
  };
});

export {
  navigationRoutes,
  navigationChildren,
  templateRoutes,
  transitionRoutes,
  routes as viewsRoutes,
};

export default routes;
