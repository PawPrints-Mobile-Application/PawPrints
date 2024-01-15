import { PawprintsEvent } from ".";

const TrigerCall = (trigger: string) => PawprintsEvent.EventDispatcher(trigger);
const Mount = (callback: Function, trigger?: string) => {
  PawprintsEvent.AddEventListener("response-db", callback);
  if (!!trigger) PawprintsEvent.AddEventListener("ready-data", TrigerCall);
};
const Unmount = (callback: Function, trigger?: string) => {
  PawprintsEvent.RemoveEventListener("response-db", callback);
  if (!!trigger) PawprintsEvent.RemoveEventListener("ready-data", TrigerCall);
};
const Request = () => PawprintsEvent.EventDispatcher("request-db");

export default { Mount, Unmount, Request };
