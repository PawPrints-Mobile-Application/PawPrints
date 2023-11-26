const EventDispatcher = (name: string, value: any = undefined) =>
  dispatchEvent(new CustomEvent(name, { detail: { storage: value } }));

const EventListener = (name: string, callback: Function) =>
  addEventListener(name, (event: any) => callback(event.detail.storage));

export default { EventDispatcher, EventListener };
