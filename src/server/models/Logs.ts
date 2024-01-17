import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import {
  Props as PropsLAD,
  Set as SetLAD,
  Get as GetLAD,
  Remove as RemoveLAD,
  SyncAll as SyncAllLAD,
  CreateModel as CreateModelLAD,
  ClearModel as ClearModelLAD,
  DeleteModel as DeleteModelLAD,
} from "./LogAddressingData";
import {
  Set as SetLAT,
  Get as GetLAT,
  SyncAll as SyncAllLAT,
  CreateModel as CreateModelLAT,
  ClearModel as ClearModelLAT,
  DeleteModel as DeleteModelLAT,
} from "./LogAddressingTable";
import { SeedGenerator } from "../../utils";

const CreateModel = (db: SQLiteDBConnection) =>
  CreateModelLAD(db).then(() => CreateModelLAT(db));
const ClearModel = (db: SQLiteDBConnection) =>
  ClearModelLAD(db).then(() => ClearModelLAT(db));
const DeleteModel = (db: SQLiteDBConnection) =>
  DeleteModelLAD(db).then(() => DeleteModelLAT(db));

const GetLATID = (date: Date, pid: string): string =>
  pid +
  SeedGenerator(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  ).toString();
const RemoveLATID = (latid: string, pid: string): Date => {
  let index: number = latid.indexOf(pid);
  if (index !== -1)
    return new Date(
      Number(latid.slice(0, index) + latid.slice(index + pid.length))
    );
  else return new Date();
};

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
  return SetLAD(db, propsLAD, uid)
    .then(() => GetLAT(db, latid))
    .then((propsLAT) => {
      if (!propsLAT)
        propsLAT = {
          latid: latid,
          lids: new Array(),
        };
      propsLAT.lids.push(propsLAD.lid);
      return SetLAT(db, propsLAT, uid);
    });
};

const Get = async (db: SQLiteDBConnection, date: Date, pid: string) => {
  const latid = GetLATID(date, pid);
  return GetLAT(db, latid)
    .then((propsLAT) => {
      if (!propsLAT)
        propsLAT = {
          latid: latid,
          lids: new Array(),
        };
      const temp: PropsLAD[] = new Array();
      propsLAT.lids.forEach(async (lid) => {
        const log = await GetLAD(db, lid);
        if (!log) return;
        temp.push(log);
      });
      return Promise.all(temp);
    })
    .then((logs) => {
      const temp: Map<string, PropsLAD> = new Map();
      logs.forEach((log) => temp.set(log.lid, log));
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
  return RemoveLAD(db, lid, uid)
    .then(() => GetLAT(db, latid))
    .then((propsLAT) => {
      if (!propsLAT)
        propsLAT = {
          latid: latid,
          lids: new Array(),
        };
      const i = propsLAT.lids.indexOf(lid);
      if (i > -1) propsLAT.lids.splice(i, 1);
      return SetLAT(db, propsLAT, uid);
    });
};

const Sync = async (db: SQLiteDBConnection, uid?: string) =>
  SyncAllLAD(db, uid).then(() => SyncAllLAT(db, uid));

export {
  SetBatch,
  Set,
  Get,
  Remove,
  GetLATID,
  RemoveLATID,
  Sync,
  CreateModel,
  ClearModel,
  DeleteModel,
};
