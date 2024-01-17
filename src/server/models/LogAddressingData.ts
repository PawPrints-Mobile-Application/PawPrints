import {
  CreateTable,
  DeleteTable,
  DeleteAllData,
  InsertRowData,
  ReadRowData,
  DeleteRowData,
  ReadAllData,
} from "../sqlite";
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
import { DeleteDocument, SetDocument } from "../firebase";

const Enums = {
  Category: {
    Weight: {
      name: "Weight",
      canSchedule: false,
      units: ["kg", "lb"],
      icon: weightIcon,
    },
    Temperature: {
      name: "Temperature",
      canSchedule: false,
      units: ["°C", "°F"],
      icon: temperatureIcon,
    },
    Symptoms: {
      name: "Symptoms",
      canSchedule: false,
      icon: symptomsIcon,
    },
    Vaccine: {
      name: "Vaccine",
      canSchedule: true,
      icon: vaccineIcon,
    },
    Medicine: {
      name: "Medicine",
      canSchedule: true,
      icon: medicineIcon,
    },
    Activity: {
      name: "Activity",
      canSchedule: true,
      icon: activityIcon,
    },
    Others: {
      name: "Others",
      canSchedule: true,
      icon: othersIcon,
    },
  },
};

const constants = {
  collection: "Users",
  document: "LogAddressingData",
  data: `
          lid TEXT PRIMARY KEY NOT NULL,
          type TEXT,
          title TEXT,
          category TEXT,
          value TEXT,
          units TEXT,
          TStart INTEGER,
          TEnd INTEGER,
          note TEXT
          `,
};

type Props = {
  lid: string;
  title: string;
  type: string;
  category: string;
  value: string;
  units: string;
  TStart: LocalTime;
  TEnd: LocalTime;
  note: string;
};

type OtherProps = {
  lid: string;
  title: string;
  type: string;
  category: string;
  value: string;
  units: string;
  TStart: number;
  TEnd: number;
  note: string;
};

const ToProps = (props: any): Props => {
  return {
    lid: props.lid,
    type: props.type,
    title: props.title,
    category: props.category,
    value: props.value,
    units: props.units,
    note: props.note,
    TStart: new LocalTime(props.TStart),
    TEnd: new LocalTime(props.TEnd),
  };
};

const ToOtherProps = (props: any): OtherProps => {
  return {
    lid: props.lid,
    type: props.type,
    title: props.title,
    category: props.category,
    value: props.value,
    units: props.units,
    note: props.note,
    TStart: props.TStart.value,
    TEnd: props.TEnd.value,
  };
};

const CreateModel = (db: SQLiteDBConnection) =>
  CreateTable(db, constants.document, constants.data);
const DeleteModel = (db: SQLiteDBConnection) =>
  DeleteTable(db, constants.document);
const ClearModel = (db: SQLiteDBConnection) =>
  DeleteAllData(db, constants.document);

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;
const documentPath = (uid: string, lid: string) =>
  `${CollectionPath(uid)}/${lid}`;

// LAT CRUD Operations
const GetAll = (db: SQLiteDBConnection) =>
  ReadAllData(db, constants.document).then((response) =>
    response.values!.map((value) => ToProps(value))
  );
const Get = (db: SQLiteDBConnection, lid: string) =>
  ReadRowData(db, constants.document, ObjectToMap({ lid: lid })).then(
    (response) => {
      if (response.values!.length === 0) return undefined;
      return ToProps(response.values![0]);
    }
  );

const Set = async (db: SQLiteDBConnection, props: Props, uid?: string) => {
  const otherProps = ToOtherProps(props);
  const data = ObjectToMap(otherProps);
  if (!!uid) await SetDocument(documentPath(uid, props.lid), otherProps);
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

const Remove = async (db: SQLiteDBConnection, lid: string, uid?: string) => {
  if (!!uid) await DeleteDocument(documentPath(uid, lid));
  return DeleteRowData(db, constants.document, ObjectToMap({ lid: lid }));
};

export type { Props, OtherProps };
export {
  Enums,
  CreateModel,
  DeleteModel,
  ClearModel,
  Set,
  GetAll,
  Get,
  Remove,
  ToProps,
  ToOtherProps,
};
