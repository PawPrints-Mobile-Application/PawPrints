import {
  CreateTable,
  DeleteTable,
  DeleteAllData,
  InsertRowData,
  ReadRowData,
  DeleteRowData,
  ReadAllData,
} from "../sqlite";
import { ObjectToMap } from "../../utils";
import { DocumentData } from "firebase/firestore";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { DeleteDocument, SetDocument } from "../firebase";

const constants = {
  collection: "Users",
  document: "LogAddressingTable",
  data: `
            latid TEXT PRIMARY KEY NOT NULL,
            lids TEXT
        `,
};

type Props = {
  latid: string; // seed id from date
  lids: Array<string>;
};

type OtherProps = {
  latid: string;
  lids: string;
};

const ToProps = (props: OtherProps): Props => {
  return {
    latid: props.latid,
    lids: JSON.parse(props.lids),
  };
};

const ToOtherProps = (props: Props | DocumentData): OtherProps => {
  return {
    latid: props.latid,
    lids: JSON.stringify(props.lids),
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
const documentPath = (uid: string, latid: string) =>
  `${CollectionPath(uid)}/${latid}`;

// LAT CRUD Operations
const GetAll = (db: SQLiteDBConnection) =>
  ReadAllData(db, constants.document).then((response) =>
    response.values!.map((value) => ToProps(value))
  );
const Get = async (db: SQLiteDBConnection, latid: string) =>
  ReadRowData(db, constants.document, ObjectToMap({ latid: latid })).then(
    (response) => {
      if (response.values!.length === 0) return undefined;
      return ToProps(response.values![0]);
    }
  );

const Set = async (db: SQLiteDBConnection, props: Props, uid?: string) => {
  const otherProps = ToOtherProps(props);
  const data = ObjectToMap(otherProps);
  if (!!uid) await SetDocument(documentPath(uid, props.latid), otherProps);
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

const Remove = async (db: SQLiteDBConnection, latid: string, uid?: string) => {
  if (!!uid) await DeleteDocument(documentPath(uid, latid));
  return DeleteRowData(db, constants.document, ObjectToMap({ latid: latid }));
};

export type { Props, OtherProps };
export { CreateModel, DeleteModel, ClearModel, Set, GetAll, Get, Remove };
