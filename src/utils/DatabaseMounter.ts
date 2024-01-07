import { PawprintsEvent } from ".";

const Mount = (callback: Function) =>
  PawprintsEvent.AddEventListener("response-db", callback);
const Unmount = (callback: Function) =>
  PawprintsEvent.AddEventListener("response-db", callback);
const Request = () => PawprintsEvent.EventDispatcher("request-db");

export default { Mount, Unmount, Request };
