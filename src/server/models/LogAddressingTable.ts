import {
  CreateTable,
  DeleteTable,
  DeleteAllData,
  InsertRowData,
  ReadRowData,
  DeleteRowData,
} from "../sqlite";
import { ObjectToMap } from "../../utils";
import { DocumentData } from "firebase/firestore";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

const constants = {
  document: "LogAddressingTable",
  data: `
            latid TEXT PRIMARY KEY NOT NULL,
            logs TEXT
        `,
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

const CreateModel = (db: SQLiteDBConnection) =>
  CreateTable(db, constants.document, constants.data);
const DeleteModel = (db: SQLiteDBConnection) =>
  DeleteTable(db, constants.document);
const ClearModel = (db: SQLiteDBConnection) =>
  DeleteAllData(db, constants.document);

// LAT CRUD Operations
const Get = async (db: SQLiteDBConnection, latid: string) =>
  ReadRowData(db, constants.document, ObjectToMap({ latid: latid })).then(
    (response) => {
      if (response.values!.length === 0) return undefined;
      return ToProps(response.values![0]);
    }
  );

const Set = async (db: SQLiteDBConnection, props: Props) => {
  const data = ObjectToMap(ToLocalProps(props));
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

const Remove = (db: SQLiteDBConnection, latid: string) =>
  DeleteRowData(db, constants.document, ObjectToMap({ latid: latid }));

export type { Props, OtherProps };
export { CreateModel, DeleteModel, ClearModel, Set, Get, Remove };
