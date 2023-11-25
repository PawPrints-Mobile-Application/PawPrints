import {
  CreateTable,
  DeleteTable,
  ResetTable,
  InsertRowData,
  ReadFirstRow,
} from "../sqlite";
import { SetDocument, GetDocument } from "../firebase";
import ObjectToMap from "../../utils/ObectToMap";
import EnumConstructor from "../../utils/EnumConstructor";

class Subscription extends EnumConstructor {
  guest: "guest" = "guest";
  free: "free" = "free";
  pawmium: "pawmium" = "pawmium";

  constructor() {
    super(["guest", "free", "pawmium"]);
  }
}

class Theme extends EnumConstructor {
  yellow: "yellow" = "yellow";
  pink: "pink" = "pink";
  blue: "blue" = "blue";

  constructor() {
    super(["yellow", "pink", "blue"]);
  }
}

class Mode extends EnumConstructor {
  light: "light" = "light";
  dark: "dark" = "dark";

  constructor() {
    super(["light", "dark"]);
  }
}

const Enums = { Subscription, Theme, Mode };

const constants = {
  collection: "Users",
  document: "Information",
  data: `
    uid TEXT PRIMARY KEY NOT NULL UNIQUE,
    email TEXT,
    username TEXT,
    subscription TEXT,
    theme TEXT,
    mode TEXT
    `,
};

type Props = {
  uid: string;
  email: string;
  username: string;
  subscription: "guest" | "free" | "pawmium";
  theme: string;
  mode: string;
};

const ToProps = (values: any): Props => {
  return {
    uid: values.uid,
    email: values.email,
    username: values.username,
    subscription: values.subscription,
    theme: values.theme,
    mode: values.mode
  }
}

const documentPath = (uid: string) =>
  `${constants.collection}/${uid}/Profile/${constants.document}`;

const CreateModel = () => CreateTable(constants.document, constants.data);
const DeleteModel = () => DeleteTable(constants.document);
const Clear = () => ResetTable(constants.document);

const Get = () =>
  ReadFirstRow(constants.document).then((response) => ToProps(response.values![0]));

const Set = async (props: Props, uid?: string) => {
  const data = ObjectToMap(props);
  if (!!uid) await SetDocument(documentPath(uid), props);
  return InsertRowData(constants.document, {
    keys: Array.from(data.keys()),
    values: Array.from(data.values()),
  }).then(() => props);
};

const Sync = async (uid: string) =>
  GetDocument(documentPath(uid)).then(async (response) => {
    console.log("syncing...");
    const data = ObjectToMap(response!.data()!);
    return InsertRowData(
      constants.document,
      {
        keys: Array.from(data.keys()),
        values: Array.from(data.values()),
      },
      true
    ).then(Get);
  });

export type { Props };
export { Enums, CreateModel, DeleteModel, Clear, Set, Get, Sync };
