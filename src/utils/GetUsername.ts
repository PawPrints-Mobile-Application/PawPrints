export default function GetUsername() {
  return localStorage.getItem("authEmail")! === "Guest"
    ? undefined
    : localStorage.getItem("authUsername")!;
}
