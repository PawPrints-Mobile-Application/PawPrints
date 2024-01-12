import {
  CreateTable,
  DeleteTable,
  DeleteAllData,
  InsertRowData,
  ReadRowData,
  DeleteRowData,
} from "../sqlite";
import {
  SetDocument,
  GetDocument,
  GetCollection,
  DeleteDocument,
} from "../firebase";
import { LocalTime, ObjectToMap } from "../../utils/";
import { ellipsisHorizontal as othersIcon } from "ionicons/icons";
import {
  weight as weightIcon,
  temperature as temperatureIcon,
  vaccine as vaccineIcon,
  medicine as medicineIcon,
  symptom as symptomsIcon,
  activity as activityIcon,
} from "../../assets";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

const Enums = {
  Record: {
    weight: {
      name: "Weight",
      canSchedule: false,
      units: ["kg", "lb"],
      icon: weightIcon,
    },
    temperature: {
      name: "Temperature",
      canSchedule: false,
      units: ["°C", "°F"],
      icon: temperatureIcon,
    },
    vaccine: {
      name: "Vaccine",
      canSchedule: false,
      icon: vaccineIcon,
    },
    medicine: {
      name: "Medicine",
      canSchedule: true,
      icon: medicineIcon,
    },
    synmptoms: {
      name: "Symptoms",
      canSchedule: false,
      icon: symptomsIcon,
    },
    activity: {
      name: "Activity",
      canSchedule: true,
      icon: activityIcon,
    },
    others: {
      name: "Others",
      canSchedule: true,
      icon: othersIcon,
    },
  },
};

const constants = {
  collection: "Users",
  document: "Logs",
  data: `
        lid TEXT PRIMARY KEY NOT NULL,
        pid TEXT,
        type TEXT,
        title TEXT,
        recordType TEXT,
        recordValue TEXT,
        recordUnits TEXT,
        TStart INTEGER,
        TEnd INTEGER,
        note TEXT
        `,
  arraySplitter: ", ",
};

type Props = {
  lid: string;
  pid: string;
  type: string;
  title: string;
  recordType: string;
  recordValue: string;
  recordUnits: string;
  TStart: LocalTime;
  TEnd: LocalTime;
  note: string;
};

type OtherProps = {
  lid: string;
  pid: string;
  type: string;
  title: string;
  recordType: string;
  recordValue: string;
  recordUnits: string;
  TStart: number;
  TEnd: number;
  note: string;
};

const ToProps = (props: any): Props => {
  return {
    lid: props.lid,
    pid: props.pid,
    type: props.type,
    title: props.title,
    recordType: props.recordType,
    recordValue: props.recordValue,
    recordUnits: props.recordUnits,
    note: props.note,
    TStart: new LocalTime(props.TStart),
    TEnd: new LocalTime(props.TEnd),
  };
};

const ToLocalProps = (props: any): OtherProps => {
  return {
    lid: props.lid,
    pid: props.pid,
    type: props.type,
    title: props.title,
    recordType: props.recordType,
    recordValue: props.recordValue,
    recordUnits: props.recordUnits,
    note: props.note,
    TStart: props.TStart.value,
    TEnd: props.TEnd.value,
  };
};

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;

const documentPath = (uid: string, lid: string) =>
  `${CollectionPath(uid)}/${lid}`;

const CreateModel = (db: SQLiteDBConnection) =>
  CreateTable(db, constants.document, constants.data);
const DeleteModel = (db: SQLiteDBConnection) =>
  DeleteTable(db, constants.document);
const ClearModel = (db: SQLiteDBConnection) =>
  DeleteAllData(db, constants.document);

const Get = (db: SQLiteDBConnection, lid: string) =>
  ReadRowData(db, constants.document, ObjectToMap({ lid: lid })).then(
    (response) => ToProps(response.values![0])
  );

const Add = async (db: SQLiteDBConnection, props: Props, uid?: string) => {
  const localProps = ToLocalProps(props);
  const data = ObjectToMap(localProps);
  if (!!uid) await SetDocument(documentPath(uid, props.lid), props);
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
const Remove = (db: SQLiteDBConnection, lid: string, uid?: string) =>
  DeleteRowData(db, constants.document, ObjectToMap({ lid: lid })).then(() => {
    if (!!uid) return DeleteDocument(documentPath(uid, lid));
  });

const Sync = async (db: SQLiteDBConnection, uid: string, lid: string) =>
  GetDocument(documentPath(uid, lid)).then(async (response) => {
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
    ).then(() => Get(db, lid));
  });

const SyncAll = async (db: SQLiteDBConnection, uid: string) =>
  ClearModel(db).then(() =>
    GetCollection(CollectionPath(uid)).then(async (value) => {
      let temp = new Array<Props>();
      for (let cloudProps of value!.values) {
        const response = await Sync(db, uid, cloudProps.lid);
        temp.push(response);
      }
      return temp;
    })
  );

export type { Props, OtherProps };
export {
  Enums,
  CreateModel,
  DeleteModel,
  ClearModel,
  Add,
  Get,
  Remove,
  Sync,
  SyncAll,
};
