import {
  CreateTable,
  DeleteTable,
  DeleteAllData,
  InsertRowData,
  ReadRowData,
} from "../sqlite";
import { SetDocument, GetDocument, GetCollection } from "../firebase";
import { SeedGenerator, ObjectToMap } from "../../utils";
import { DocumentData } from "firebase/firestore";
import { Props as PropsLog, Add as AddLog, Remove } from "./Logs";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

const constants = {
  collection: "Users",
  document: "LogAddressingTable",
  data: `
            latid TEXT PRIMARY KEY NOT NULL,
            logs TEXT
        `,
  arraySplitter: ", ",
};

type Props = {
  latid: string; // seed id from date
  logs: Array<string>;
};

type OtherProps = {
  latid: string;
  logs: string;
};

const ToProps = (props: OtherProps): Props => {
  return {
    latid: props.latid,
    logs: JSON.parse(props.logs),
  };
};

const ToLocalProps = (props: Props | DocumentData): OtherProps => {
  return {
    latid: props.latid,
    logs: JSON.stringify(props.logs),
  };
};

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;

const documentPath = (uid: string, latid: string) =>
  `${CollectionPath(uid)}/${latid}`;

const CreateModel = (db: SQLiteDBConnection) =>
  CreateTable(db, constants.document, constants.data);
const DeleteModel = (db: SQLiteDBConnection) =>
  DeleteTable(db, constants.document);
const ClearModel = (db: SQLiteDBConnection) =>
  DeleteAllData(db, constants.document);

// LAT CRUD Operations
const Get = (db: SQLiteDBConnection, latid: string) =>
  ReadRowData(db, constants.document, ObjectToMap({ latid: latid })).then(
    (response) => ToProps(response.values![0])
  );

const AddLogs = async (
  db: SQLiteDBConnection,
  DStart: Date,
  DEnd: Date,
  propsLog: PropsLog,
  uid?: string
) => {
  const startDate = new Date(
    DStart.getFullYear(),
    DStart.getMonth(),
    DStart.getDate()
  );
  const endDtate = new Date(
    DEnd.getFullYear(),
    DEnd.getMonth(),
    DEnd.getDate()
  );
  const temp = [];
  for (
    let date = startDate;
    date <= endDtate;
    date.setDate(date.getDate() + 1)
  ) {
    propsLog.lid += SeedGenerator(date);
    temp.push(
      await AddLog(db, propsLog, uid).then(() =>
        Add(db, date, propsLog.lid, uid)
      )
    );
  }
  return Promise.all(temp);
};

const Add = async (
  db: SQLiteDBConnection,
  date: Date,
  lid: string,
  uid?: string
) => {
  let newProps: Props = {
    latid: SeedGenerator(date).toString(),
    logs: [],
  };
  return Get(db, newProps.latid).then(async (response) => {
    const props = !response ? newProps : response;
    props.logs.push(lid);
    const localProps = ToLocalProps(props);
    const data = ObjectToMap(localProps);
    if (!!uid) await SetDocument(documentPath(uid, props.latid), props);
    return InsertRowData(
      db,
      constants.document,
      {
        keys: Array.from(data.keys()),
        values: Array.from(data.values()),
      },
      true
    );
  });
};

const RemoveLog = (
  db: SQLiteDBConnection,
  date: Date,
  lid: string,
  uid?: string
) =>
  Get(db, SeedGenerator(date).toString())
    .then((props) => {
      if (!props) return;
      props.logs = props.logs.filter((each) => each !== lid);
      return props;
    })
    .then((data) => {
      if (!data) return;
      return Add(db, date, SeedGenerator(date).toString(), uid);
    })
    .then(() => Remove(db, lid, uid));

// LAT TO/FROM CLOUD CONNECTION
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
  ClearModel(db).then(() =>
    GetCollection(CollectionPath(uid)).then(async (value) => {
      let temp = new Array<Props>();
      for (let cloudProps of value!.values) {
        const response = await Sync(db, uid, cloudProps.pid);
        temp.push(response);
      }
      return temp;
    })
  );

export type { Props, OtherProps };
export {
  CreateModel,
  DeleteModel,
  ClearModel,
  AddLogs,
  Add,
  Get,
  RemoveLog,
  Sync,
  SyncAll,
};
