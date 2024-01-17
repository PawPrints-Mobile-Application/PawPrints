import { PawprintsEvent } from ".";

const Mount = (callback: Function, onReadyCallback?: Function) => {
  PawprintsEvent.AddEventListener("response-db", callback);
  if (!!onReadyCallback)
    PawprintsEvent.AddEventListener("ready-app", onReadyCallback);
};
const Unmount = (callback: Function, onReadyCallback?: Function) => {
  PawprintsEvent.RemoveEventListener("response-db", callback);
  if (!!onReadyCallback)
    PawprintsEvent.RemoveEventListener("ready-app", onReadyCallback);
};
const Request = () => PawprintsEvent.EventDispatcher("request-db");

export default { Mount, Unmount, Request };
