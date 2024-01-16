import { Defaulter } from ".";

export default {
  // Get
  GetUID: (strict: boolean = false): string | undefined => {
    const temp = localStorage.getItem("uid");
    if (["", null].includes(temp) && strict) return undefined;
    return Defaulter(localStorage.getItem("uid"), "");
  },
  GetUsername: (): string => Defaulter(localStorage.getItem("username"), ""),
  GetEmail: (): string => Defaulter(localStorage.getItem("email"), ""),
  GetSubscription: (): string =>
    Defaulter(localStorage.getItem("subscription"), ""),
  GetTheme: (): string =>
    Defaulter(localStorage.getItem("theme"), "yellow | light"),
  GetAvatar: (): number =>
    Number(Defaulter(localStorage.getItem("avatar"), "2")),
  // Set
  SetUID: (value: string = "") => localStorage.setItem("uid", value),
  SetUsername: (value: string = "") => localStorage.setItem("username", value),
  SetEmail: (value: string = "") => localStorage.setItem("email", value),
  SetSubscription: (value: string = "") =>
    localStorage.setItem("subscription", value),
  SetTheme: (theme: string = "yellow", mode: string = "light") =>
    localStorage.setItem("theme", `${theme} | ${mode}`),
  SetAvatar: (i: number = 2) => localStorage.setItem("avatar", i.toString()),
};
