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
import { Timestamp } from "firebase/firestore";
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
      latids TEXT
        `,
  supports: ["local", "cloud"],
};

type Props = {
  pid: string;
  name: string;
  birthday: Date;
  breed: string;
  color: string;
  latids: Array<string>;
};

type LocalProps = {
  pid: string;
  name: string;
  birthday: string;
  breed: string;
  color: string;
  latids: string;
};

type CloudProps = {
  pid: string;
  name: string;
  birthday: Timestamp;
  breed: string;
  color: string;
  latids: Array<string>;
};

const ToProps = (props: any, source: "LocalProps" | "CloudProps"): Props => {
  let { birthday, latids } = props;
  if (source === "CloudProps") {
    birthday = birthday.toDate();
  } else {
    birthday = new Date(birthday);
    latids = JSON.parse(latids);
  }
  return {
    pid: props.pid,
    name: props.name,
    birthday: birthday,
    breed: props.breed,
    color: props.color,
    latids: latids,
  };
};

const ToLocalProps = (
  props: any,
  source: "Props" | "CloudProps"
): LocalProps => {
  let { birthday } = props;
  if (source === "CloudProps") {
    birthday = birthday.toDate();
  }
  return {
    pid: props.pid,
    name: props.name,
    birthday: birthday.toString(),
    breed: props.breed,
    color: props.color,
    latids: JSON.stringify(props.latids),
  };
};

const ToCloudProps = (
  props: any,
  source: "LocalProps" | "Props"
): CloudProps => {
  let { birthday, latids } = props;
  if (source === "Props") {
    birthday = new Date(birthday);
  } else {
    latids = JSON.parse(latids);
  }
  return {
    pid: props.pid,
    name: props.name,
    birthday: Timestamp.fromDate(birthday),
    breed: props.breed,
    color: props.color,
    latids: latids,
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

const GetAll = (db: SQLiteDBConnection) =>
  ReadAllData(db, constants.document).then((response) =>
    response.values!.map((value) => ToProps(value, "LocalProps"))
  );
const Get = (db: SQLiteDBConnection, pid: string) =>
  ReadRowData(db, constants.document, ObjectToMap({ pid: pid })).then(
    (response) => ToProps(response.values![0], "LocalProps")
  );

const Add = async (db: SQLiteDBConnection, props: Props, uid?: string) => {
  const localProps = ToLocalProps(props, "Props");
  const data = ObjectToMap(localProps);
  if (!!uid)
    await SetDocument(
      documentPath(uid, props.pid),
      ToCloudProps(props, "Props")
    );
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

const Sync = async (db: SQLiteDBConnection, pid: string, uid: string) => {
  if (!uid) return Get(db, pid);
  return GetDocument(documentPath(uid, pid)).then(async (response) => {
    const documentData = response!.data()!;
    const localProps = ToLocalProps(documentData, "CloudProps");
    const props = ToProps(documentData, "CloudProps");
    const data = ObjectToMap(localProps);
    return InsertRowData(
      db,
      constants.document,
      {
        keys: Array.from(data.keys()),
        values: Array.from(data.values()),
      },
      true
    ).then(() => props);
  });
};

const SyncAll = async (db: SQLiteDBConnection, uid?: string) => {
  if (!uid) return GetAll(db);
  return ClearModel(db).then(() =>
    GetCollection(CollectionPath(uid)).then(async (value) => {
      let temp = new Array<Props>();
      for (let cloudProps of value!.values) {
        const response = await Sync(db, cloudProps.pid, uid);
        temp.push(response);
      }
      return temp;
    })
  );
};

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
