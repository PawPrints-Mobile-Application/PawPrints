export default function GetUID() {
  return localStorage.getItem("authEmail")! === "Guest"
    ? undefined
    : localStorage.getItem("authID")!;
}
