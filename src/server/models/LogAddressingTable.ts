import {
  CreateTable,
  DeleteTable,
  ResetTable,
  InsertRowData,
  ReadRowData,
} from "../sqlite";
import { SetDocument, GetDocument, GetCollection } from "../firebase";
import ObjectToMap from "../../utils/ObjectToMap";
import { SeedGenerator, StringToArray } from "../../utils";
import { DocumentData } from "firebase/firestore";
import { Props as PropsLog, Add as SaveLog, Get as FetchLog } from "./Logs";

const constants = {
  collection: "Users",
  document: "LogAddressingTable",
  data: `
            latid TEXT PRIMARY KEY NOT NULL,
            year INTEGER,
            month INTEGER,
            date INTEGER,
            logs TEXT
        `,
  arraySplitter: ", ",
};

type Props = {
  latid: string; // seed id from date
  year: number;
  month: number;
  date: number;
  logs: Array<string>;
};

type LocalProps = {
  latid: string;
  year: number;
  month: number;
  date: number;
  logs: string;
};

const ToProps = (props: LocalProps): Props => {
  return {
    latid: props.latid,
    year: props.year,
    month: props.month,
    date: props.date,
    logs: StringToArray(props.logs, constants.arraySplitter),
  };
};

const ToLocalProps = (props: Props | DocumentData): LocalProps => {
  return {
    latid: props.latid,
    year: props.year,
    month: props.month,
    date: props.date,
    logs: props.logs.join(constants.arraySplitter),
  };
};

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;

const documentPath = (uid: string, latid: string) =>
  `${CollectionPath(uid)}/${latid}`;

const CreateModel = () => CreateTable(constants.document, constants.data);
const DeleteModel = () => DeleteTable(constants.document);
const Clear = () => ResetTable(constants.document);

// LAT CRUD Operations
const GetAll = () =>
  ReadRowData(constants.document).then((response) =>
    response.values!.map((localProps: LocalProps) => ToProps(localProps))
  );

const Get = (date: Date) =>
  ReadRowData(constants.document, {
    key: "latid",
    value: SeedGenerator(date).toString(),
  }).then((response) => {
    if (!response.values || response.values.length === 0) return undefined;
    return ToProps(response.values[0]);
  });

const AddBatch = async (
  DStart: Date,
  DEnd: Date,
  lid: string,
  uid?: string
) => {
  const startDtate = new Date(
    DStart.getFullYear(),
    DStart.getMonth(),
    DStart.getDate()
  );
  const endDtate = new Date(
    DEnd.getFullYear(),
    DEnd.getMonth(),
    DEnd.getDate()
  );
  for (
    let date = startDtate;
    date <= endDtate;
    date.setDate(date.getDate() + 1)
  ) {
    await Add(date, lid, uid);
  }
};

const Add = async (date: Date, lid: string, uid?: string) => {
  let newProps: Props = {
    latid: SeedGenerator(date).toString(),
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    logs: [],
  };
  return Get(date).then(async (response) => {
    const props = !response ? newProps : response;
    props.logs.push(lid);
    const localProps = ToLocalProps(props);
    const data = ObjectToMap(localProps);
    if (!!uid) await SetDocument(documentPath(uid, props.latid), props);
    return InsertRowData(
      constants.document,
      {
        keys: Array.from(data.keys()),
        values: Array.from(data.values()),
      },
      true
    );
  });
};

const RemoveBatch = async (
  DStart: Date,
  DEnd: Date,
  lid: string,
  uid?: string
) => {
  for (let date = DStart; date <= DEnd; date.setDate(date.getDate() + 1)) {
    await Remove(date, lid, uid);
  }
};

const Remove = (date: Date, lid: string, uid?: string) =>
  Get(date)
    .then((props) => {
      if (!props) return;
      props.logs = props.logs.filter((each) => each !== lid);
      return props;
    })
    .then((data) => {
      if (!data) return;
      Add(date, lid, uid);
    });

// LAT TO/FROM APP CONNECTION
const AddLogs = (propsLog: PropsLog, uid?: string) =>
  SaveLog(propsLog, uid).then(() =>
    AddBatch(propsLog.DStart, propsLog.DEnd, propsLog.lid, uid)
  );

const RemoveLogs = async (
  DStart: Date,
  DEnd: Date,
  lid: string,
  uid?: string
) => RemoveBatch(DStart, DEnd, lid, uid);

const GetLogs = async (DStart: Date, DEnd: Date) => {
  const startDtate = new Date(
    DStart.getFullYear(),
    DStart.getMonth(),
    DStart.getDate()
  );
  const endDtate = new Date(
    DEnd.getFullYear(),
    DEnd.getMonth(),
    DEnd.getDate()
  );
  let temp = new Map<string, PropsLog[]>();
  for (
    let date = startDtate;
    date <= endDtate;
    date.setDate(date.getDate() + 1)
  ) {
    const props = await Get(date);
    if (!props) continue;
    props.logs.forEach(async (lid) => {
      const propsLog = await FetchLog(lid, date);
      const latid = SeedGenerator(date).toString();
      if (!temp.get(latid)) temp.set(latid, [propsLog]);
      else temp.get(latid)?.push(propsLog);
    });
  }
  return temp;
};

// LAT TO/FROM CLOUD CONNECTION
const Sync = async (uid: string, date: Date) =>
  GetDocument(documentPath(uid, SeedGenerator(date).toString())).then(
    async (response) => {
      const documentData = response!.data()!;
      const localProps = ToLocalProps(documentData);
      const data = ObjectToMap(localProps);
      return InsertRowData(
        constants.document,
        {
          keys: Array.from(data.keys()),
          values: Array.from(data.values()),
        },
        true
      );
    }
  );

const SyncAll = async (uid: string) =>
  GetCollection(CollectionPath(uid)).then(async (value) => {
    for (let cloudProps of value!.values) {
      const localProps = ToLocalProps(cloudProps);
      const data = ObjectToMap(localProps);
      await InsertRowData(
        constants.document,
        {
          keys: Array.from(data.keys()),
          values: Array.from(data.values()),
        },
        true
      );
    }
  });

export type { Props, LocalProps };
export {
  CreateModel,
  DeleteModel,
  Clear,
  AddBatch,
  Add,
  GetAll,
  Get,
  Remove,
  AddLogs,
  RemoveLogs,
  GetLogs,
  Sync,
  SyncAll,
};
