const EventDispatcher = (name: string, value: any = undefined) =>
  dispatchEvent(new CustomEvent(name, { detail: { storage: value } }));

const AddEventListener = (name: string, callback: Function) =>
  addEventListener(name, (event: any) => callback(event.detail.storage));

const RemoveEventListener = (name: string, callback: Function) =>
  removeEventListener(name, (event: any) => callback(event.detail.storage));

export default { EventDispatcher, AddEventListener, RemoveEventListener };
