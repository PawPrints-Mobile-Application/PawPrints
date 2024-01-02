import {
  CreateTable,
  DeleteTable,
  InsertRowData,
  ReadAllData,
  ReadRowData,
  DeleteRowData,
  DeleteAllData,
} from "../sqlite";
import {
  SetDocument,
  GetDocument,
  GetCollection,
  DeleteDocument,
} from "../firebase";
import { ObjectToMap } from "../../utils";
import { DocumentData } from "firebase/firestore";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

const Enums = {
  InOutdoor: {
    indoor: "indoor",
    outdoor: "outdoor",
  },
  Fixing: {
    none: "none",
    neutered: "neutered",
    spayed: "spayed",
  },
};

const constants = {
  collection: "Users",
  document: "Dogs",
  data: `
      pid TEXT PRIMARY KEY UNIQUE NOT NULL,
      name TEXT,
      birthday TEXT,
      breed TEXT,
      color TEXT,
      logs TEXT
        `,
  supports: ["local", "cloud"],
};

type Props = {
  pid: string;
  name: string;
  birthday: string;
  breed: string;
  color: string;
  logs: Array<string>;
};

type LocalProps = {
  pid: string;
  name: string;
  birthday: string;
  breed: string;
  color: string;
  logs: string;
};

const ToProps = (props: LocalProps): Props => {
  return {
    pid: props.pid,
    name: props.name,
    birthday: props.birthday,
    breed: props.breed,
    color: props.color,
    logs: JSON.parse(props.logs),
  };
};

const ToLocalProps = (props: Props | DocumentData): LocalProps => {
  return {
    pid: props.pid,
    name: props.name,
    birthday: props.birthday,
    breed: props.breed,
    color: props.color,
    logs: JSON.stringify(props.logs),
  };
};

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;

const documentPath = (uid: string, pid: string) =>
  `${CollectionPath(uid)}/${pid}`;

const CreateModel = (db: SQLiteDBConnection) =>
  CreateTable(db, constants.document, constants.data);
const DeleteModel = (db: SQLiteDBConnection) =>
  DeleteTable(db, constants.document);
const ClearModel = (db: SQLiteDBConnection) =>
  DeleteAllData(db, constants.document);

const GetAll = (db: SQLiteDBConnection) => ReadAllData(db, constants.document);
const Get = (db: SQLiteDBConnection, pid: string) =>
  ReadRowData(db, constants.document, ObjectToMap({ pid: pid })).then(
    (response) => ToProps(response.values![0])
  );

const Add = async (db: SQLiteDBConnection, props: Props, uid?: string) => {
  const localProps = ToLocalProps(props);
  const data = ObjectToMap(localProps);
  if (!!uid) await SetDocument(documentPath(uid, props.pid), props);
  return InsertRowData(
    db,
    constants.document,
    {
      keys: Array.from(data.keys()),
      values: Array.from(data.values()),
    },
    true
  ).then(() => props);
};

const Remove = (db: SQLiteDBConnection, pid: string, uid?: string) =>
  DeleteRowData(db, constants.document, ObjectToMap({ pid: pid })).then(() => {
    if (!!uid) return DeleteDocument(documentPath(uid, pid));
  });

const Sync = async (db: SQLiteDBConnection, uid: string, pid: string) =>
  GetDocument(documentPath(uid, pid)).then(async (response) => {
    const documentData = response!.data()!;
    const localProps = ToLocalProps(documentData);
    const data = ObjectToMap(localProps);
    return InsertRowData(
      db,
      constants.document,
      {
        keys: Array.from(data.keys()),
        values: Array.from(data.values()),
      },
      true
    ).then(() => Get(db, pid));
  });

const SyncAll = async (db: SQLiteDBConnection, uid: string) =>
  GetCollection(CollectionPath(uid)).then(async (value) => {
    let temp = new Array<Props>();
    for (let cloudProps of value!.values) {
      const response = await Sync(db, uid, cloudProps.pid);
      temp.push(response);
    }
    return temp;
  });

export type { Props, LocalProps };
export {
  Enums,
  CreateModel,
  DeleteModel,
  ClearModel,
  Add,
  GetAll,
  Get,
  Remove,
  Sync,
  SyncAll,
};
