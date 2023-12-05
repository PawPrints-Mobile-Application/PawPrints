import {
  CreateTable,
  DeleteTable,
  ResetTable,
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
import ObjectToMap from "../../utils/ObjectToMap";
import { LocalTime, EnumConstructor } from "../../utils/";
import {
  ellipsisHorizontal as othersIcon,
} from "ionicons/icons";
import {
  weight as weightIcon,
  temperature as temperatureIcon,
  vaccine as vaccineIcon,
  medicine as medicineIcon,
  symptom as symptomsIcon,
  activity as activityIcon,
} from "../../assets/icons";

type RecordType = {
  name: string;
  canSchedule: boolean;
  units?: Array<String>;
  icon: string;
};

class Record extends EnumConstructor {
  types: Array<RecordType> = [
    {
      name: "Weight",
      canSchedule: false,
      units: ["kg", "lb"],
      icon: weightIcon,
    },
    {
      name: "Temperature",
      canSchedule: false,
      units: ["°C", "°F"],
      icon: temperatureIcon,
    },
    {
      name: "Vaccine",
      canSchedule: false,
      icon: vaccineIcon,
    },
    {
      name: "Medicine",
      canSchedule: true,
      icon: medicineIcon,
    },
    {
      name: "Symptoms",
      canSchedule: false,
      icon: symptomsIcon,
    },
    {
      name: "Activity",
      canSchedule: true,
      icon: activityIcon,
    },
    {
      name: "Others",
      canSchedule: true,
      icon: othersIcon,
    },
  ];
  constructor() {
    super([
      "Weight",
      "Temperature",
      "Vacccine",
      "Symptoms",
      "Activity",
      "Others",
    ]);
  }
  canSchedule(name: string): boolean {
    let temp = false;
    this.types.forEach((type) => {
      if (type.name === name && type.canSchedule) {
        temp = true;
      }
    });
    return temp;
  }
  hasUnits(name: string): boolean {
    let temp = false;
    this.types.forEach((type) => {
      if (type.name === name && !!type.units) {
        temp = true;
      }
    });
    return temp;
  }
  getRecordTypes(canSchedule: boolean = false): RecordType[] {
    if (!canSchedule) return this.types;
    return this.types?.filter((type) => type.canSchedule);
  }
  get(name: string, defaultValue: any = undefined): RecordType {
    let temp = this.types?.find((value) => value.name === name);
    if (!temp) return defaultValue;
    return temp;
  }
  getUnits(name: string, defaultValue: any = undefined) {
    let temp = this.types?.find((value) => value.name === name)?.units;
    if (!temp) return defaultValue;
    return temp;
  }
}
const Enums = {
  Record,
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
        DStart INTEGER,
        DEnd INTEGER,
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
  DStart: Date;
  DEnd: Date;
  TStart: LocalTime;
  TEnd: LocalTime;
  note: string;
};

type LocalProps = {
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

const ToProps = (props: any, date: Date): Props => {
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
    DStart: date,
    DEnd: date,
  };
};

const ToLocalProps = (props: any): LocalProps => {
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

const CreateModel = () => CreateTable(constants.document, constants.data);
const DeleteModel = () => DeleteTable(constants.document);
const Clear = () => ResetTable(constants.document);

const Get = (lid: string, date: Date) =>
  ReadRowData(constants.document, { key: "lid", value: lid }).then((response) =>
    ToProps(response.values![0], date)
  );

const Add = async (props: Props, uid?: string) => {
  const localProps = ToLocalProps(props);
  const data = ObjectToMap(localProps);
  if (!!uid)
    await SetDocument(documentPath(uid, props.lid), ToLocalProps(props));
  return InsertRowData(
    constants.document,
    {
      keys: Array.from(data.keys()),
      values: Array.from(data.values()),
    },
    true
  );
};

const Remove = (lid: string, uid?: string) =>
  DeleteRowData(constants.document, { key: "lid", value: lid }).then(() => {
    if (!!uid) return DeleteDocument(documentPath(uid, lid));
  });

const Sync = async (uid: string, lid: string) =>
  GetDocument(documentPath(uid, lid)).then(async (response) => {
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
  });

const SyncAll = async (uid: string) =>
  GetCollection(CollectionPath(uid)).then(async (value) => {
    for (let cloudProps of value!.values) {
      const data = ObjectToMap(cloudProps);
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
  Enums,
  CreateModel,
  DeleteModel,
  Clear,
  Add,
  Get,
  Remove,
  Sync,
  SyncAll,
};
