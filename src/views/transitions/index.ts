const routes = [
  {
    name: "LandingPage",
    path: "/landingpage",
    meta: { requiresAuth: false },
  },
  {
    name: "SplashToHome",
    path: "/splashtohome",
    meta: { requiresAuth: true },
  },
  {
    name: "SplashToAuth",
    path: "/splashtoauth",
    meta: { requiresAuth: false },
  },
].map((child) => {
  return {
    name: child.name,
    path: child.path,
    meta: child.meta,
    parent: 'transitions/'
  };
});

export default routes;
