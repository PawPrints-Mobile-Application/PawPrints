const routes = [
  {
    path: "",
    default: "/transitions",
    children: [
      
    ]
  },
  {
    path: "/transitions",
    default: "/landingpage",
    children: [
      {
        name: "LandingPage",
        path: "/landingpage",
      },
      {
        name: "SplashToAuth",
        path: "/auth",
      },
      {
        name: "SplashToHome",
        path: "/home",
      },
    ],
  },
  {
    path: "/navigation",
    default: "/home",
    children: [
      {
        name: "Home",
        path: "/home",
        children: [
          {
            name: "DogProfile",
            path: "/:name",
          },
        ],
      },
      {
        name: "Forums",
        path: "/facts",
        children: [
          {
            name: "DogProfile",
            path: "/:name",
          },
        ],
      },
      {
        name: "Maps",
        path: "/maps",
      },
      {
        name: "Settings",
        path: "/settings",
        children: [
          {
            name: "Profile",
            path: "/profile",
          },
          {
            name: "Preferences",
            path: "/preferences",
          },
          {
            name: "Subscriptions",
            path: "/subscriptions",
          },
          {
            name: "About",
            path: "/about",
          },
        ],
      },
    ],
  },
];

export default routes;
