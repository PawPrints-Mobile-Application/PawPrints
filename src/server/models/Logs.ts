import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import {
  Props as PropsLAD,
  Set as SetLAD,
  Get as GetLAD,
  Remove as RemoveLAD,
  ToOtherProps,
} from "./LogAddressingData";
import {
  Props as PropsLAT,
  Set as SetLAT,
  Get as GetLAT,
} from "./LogAddressingTable";
import { SeedGenerator } from "../../utils";
import {
  DeleteDocument,
  GetCollection,
  GetDocument,
  SetDocument,
} from "../firebase";

const constants = {
  collection: "Users",
  document1: "LogAddressingTable",
  document2: "LogAddressingData",
};

const CollectionPathLAT = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document1}`;
const CollectionPathLAD = (uid: string, latid: string) =>
  `${CollectionPathLAT(uid)}/${latid}/${constants.document2}`;
const documentPath = (uid: string, latid: string, lid: string) =>
  `${CollectionPathLAD(uid, latid)}/${lid}`;

const GetLATID = (date: Date, pid: string): string =>
  pid +
  SeedGenerator(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  ).toString();

const SetBatch = async (
  db: SQLiteDBConnection,
  propsLAD: PropsLAD,
  DStart: Date,
  DEnd: Date,
  pid: string,
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
    temp.push(await Set(db, propsLAD, date, pid, uid));
  }
  return Promise.all(temp);
};

const Set = async (
  db: SQLiteDBConnection,
  propsLAD: PropsLAD,
  date: Date,
  pid: string,
  uid?: string
) => {
  const latid = GetLATID(date, pid);
  console.log(latid);
  if (!!uid)
    await SetDocument(
      documentPath(uid, latid, propsLAD.lid),
      ToOtherProps(propsLAD)
    );
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

// const Sync = async (
//   db: SQLiteDBConnection,
//   date: Date,
//   pid: string,
//   lid: string,
//   uid: string
// ) => {
//   const latid = GetLATID(date, pid);
//   return GetCollection(CollectionPathLAD(uid, latid)).then(async (value) => {
//     let temp = new Array<Props>();
//     for (let cloudProps of value!.values) {
//       const response = await Sync(db, uid, cloudProps.pid);
//       temp.push(response);
//     }
//     return temp;
//   });
// };

export { SetBatch, Set, Get, Remove };
