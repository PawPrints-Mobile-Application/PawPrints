import {
  CreateTable,
  DeleteTable as RemoveTable,
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

const Enums = { Subscription };

const constants = {
  collection: "Users",
  document: "Information",
  data: `
    uid TEXT PRIMARY KEY NOT NULL,
    email TEXT,
    username TEXT,
    subscription TEXT
    `,
};

type Props = {
  uid: string;
  email: string;
  username: string;
  subscription: "guest" | "free" | "pawmium";
};

const documentPath = (uid?: string) =>
  `${constants.collection}/${
    !!uid ? uid : localStorage.getItem("authID")!
  }/Profile/${constants.document}`;

const Initialize = () => CreateTable(constants.document, constants.data);
const DeleteTable = () => RemoveTable(constants.document);
const Clear = () => ResetTable(constants.document);

const Get = () =>
  ReadFirstRow(constants.document).then((response) => response.values![0]);

const Set = async (props: Props, sync: boolean = true) => {
  const data = ObjectToMap(props);
  return InsertRowData(constants.document, {
    keys: Array.from(data.keys()),
    values: Array.from(data.values()),
  }).then(() => {
    if (!sync) return props;
    return SetDocument(documentPath(props.uid), props).then(() => props)
  });
};

const Sync = (uid?: string) =>
  GetDocument(documentPath(uid)).then(async (response) => {
    console.log("syncing...");
    const data = ObjectToMap(response!.data()!);
    return InsertRowData(constants.document, {
      keys: Array.from(data.keys()),
      values: Array.from(data.values()),
    }).then(Get);
  });

export type { Props };
export { Enums, Initialize, DeleteTable, Clear, Set, Get, Sync };
