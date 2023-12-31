import { Defaulter } from ".";

export default {
  GetUID: (): string => Defaulter(localStorage.getItem("uid")!, ""),
  GetUsername: (): string => Defaulter(localStorage.getItem("username"), ""),
  GetEmail: (): string => Defaulter(localStorage.getItem("email"), ""),
  GetSubscription: (): string =>
    Defaulter(localStorage.getItem("subscription"), ""),
  GetTheme: (): string => Defaulter(localStorage.getItem("theme"), "yellow | light"),
};
