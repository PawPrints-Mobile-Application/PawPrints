import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import {
  Props as PropsLAD,
  Set as SetLAD,
  Get as GetLAD,
  Remove as RemoveLAD,
} from "./LogAddressingData";
import {
  Props as PropsLAT,
  Set as SetLAT,
  Get as GetLAT,
} from "./LogAddressingTable";
import { SeedGenerator } from "../../utils";
import { DeleteDocument, SetDocument } from "../firebase";

const constants = {
  collection: "Users",
  document: "LogAddressingTable",
};

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;
const documentPath = (uid: string, latid: string, lid: string) =>
  `${CollectionPath(uid)}/ ${latid}/${lid}`;

const GetLATID = (date: Date, pid: string): string =>
  pid +
  SeedGenerator(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  ).toString();

const Set = async (
  db: SQLiteDBConnection,
  propsLAD: PropsLAD,
  date: Date,
  pid: string,
  uid?: string
) => {
  const latid = GetLATID(date, pid);
  if (!!uid)
    await SetDocument(documentPath(uid, latid, propsLAD.lid), propsLAD);
  return SetLAD(db, propsLAD)
    .then(() => GetLAT(db, latid))
    .then((propsLAT: PropsLAT) => {
      propsLAT.logs.push(propsLAD.lid);
      return SetLAT(db, propsLAT);
    });
};

const Get = async (db: SQLiteDBConnection, date: Date, pid: string) => {
  const latid = GetLATID(date, pid);
  return GetLAT(db, latid)
    .then(async (propsLAT: PropsLAT) => {
      const temp = new Map<string, PropsLAD>();
      for (let i = 0; i <= propsLAT.logs.length; i++) {
        temp.set(propsLAT.logs[i], await GetLAD(db, propsLAT.logs[i]));
      }
      return Promise.all(temp);
    })
    .then((logs) => {
      const temp = new Map<string, PropsLAD>();
      logs.forEach((log) => temp.set(log[0], log[1]));
      return temp;
    });
};

const Remove = async (
  db: SQLiteDBConnection,
  date: Date,
  pid: string,
  lid: string,
  uid?: string
) => {
  const latid = GetLATID(date, pid);
  if (!!uid) await DeleteDocument(documentPath(uid, latid, lid));
  return RemoveLAD(db, lid);
};

export { Set, Get, Remove };
