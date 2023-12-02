import {
  CreateTable,
  DeleteTable,
  ResetTable,
  InsertRowData,
  ReadRowData,
  DeleteRowData,
} from "../sqlite";
import { SetDocument, GetDocument, GetCollection } from "../firebase";
import ObjectToMap from "../../utils/ObjectToMap";
import { Timestamp } from "firebase/firestore";
import { LocalTime, SeedGenerator, EnumConstructor } from "../../utils/";

type RecordType = {
  name: string;
  canSchedule: boolean;
  units?: Array<String>;
};

class Record extends EnumConstructor {
  types: Array<RecordType> = [
    {
      name: "Weight",
      canSchedule: false,
      units: ["kg", "lb"],
    },
    {
      name: "Temperature",
      canSchedule: false,
      units: ["°C", "°F"],
    },
    {
      name: "Vaccine",
      canSchedule: false,
    },
    {
      name: "Medicine",
      canSchedule: true,
    },
    {
      name: "Symptoms",
      canSchedule: true,
    },
    {
      name: "Activity",
      canSchedule: true,
    },
    {
      name: "Others",
      canSchedule: true,
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
        type TEXT,
        title TEXT,
        recordType TEXT,
        recordValue TEXT,
        recordUnits TEXT,
        DStart INTEGER,
        TStart INTEGER,
        DEnd INTEGER,
        TEnd INTEGER,
        note TEXT
        `,
  arraySplitter: ", ",
};

type Props = {
  lid: string;
  type: string;
  title: string;
  recordType: string;
  recordValue: string;
  recordUnits: string;
  DStart: Date;
  TStart: LocalTime;
  DEnd: Date;
  TEnd: LocalTime;
  note: string;
};

type LocalProps = {
  lid: string;
  type: string;
  title: string;
  recordType: string;
  recordValue: string;
  recordUnits: string;
  DStart: number;
  TStart: number;
  DEnd: number;
  TEnd: number;
  note: string;
};

type CloudProps = {
  lid: string;
  type: string;
  title: string;
  recordType: string;
  recordValue: string;
  recordUnits: string;
  DStart: Timestamp;
  TStart: number;
  DEnd: Timestamp;
  TEnd: number;
  note: string;
};

const ToProps = (props: any, source: "LocalProps" | "CloudProps"): Props => {
  let { DStart, DEnd } = props;
  if (source === "LocalProps") {
    DStart = new Date(props.DStart);
    DEnd = new Date(props.DEnd);
  } else {
    DStart = props.DStart.toDate();
    DEnd = props.DEnd.toDate();
  }
  return {
    lid: props.lid,
    type: props.type,
    title: props.title,
    recordType: props.recordType,
    recordValue: props.recordValue,
    recordUnits: props.recordUnits,
    note: props.note,
    DStart: DStart,
    TStart: new LocalTime(props.TStart),
    DEnd: DEnd,
    TEnd: new LocalTime(props.TEnd),
  };
};

const ToLocalProps = (
  props: any,
  source: "Props" | "CloudProps"
): LocalProps => {
  let { DStart, DEnd, TStart, TEnd } = props;
  if (source === "CloudProps") {
    DStart = props.DStart.toDate();
    DEnd = props.DEnd.toDate();
  } else {
    TStart = props.TStart.value;
    TEnd = props.TEnd.value;
  }
  return {
    lid: props.lid,
    type: props.type,
    title: props.title,
    recordType: props.recordType,
    recordValue: props.recordValue,
    recordUnits: props.recordUnits,
    note: props.note,
    DStart: SeedGenerator(DStart),
    TStart: TStart,
    DEnd: SeedGenerator(DEnd),
    TEnd: TEnd,
  };
};

const ToCloudProps = (
  props: any,
  source: "Props" | "LocalProps"
): CloudProps => {
  let { DStart, DEnd, TStart, TEnd } = props;
  if (source === "LocalProps") {
    DStart = new Date(props.DStart);
    DEnd = new Date(props.DEnd);
  } else {
    TStart = props.TStart.value;
    TEnd = props.TEnd.value;
  }
  return {
    lid: props.lid,
    type: props.type,
    title: props.title,
    recordType: props.recordType,
    recordValue: props.recordValue,
    recordUnits: props.recordUnits,
    note: props.note,
    DStart: Timestamp.fromDate(DStart),
    TStart: TStart,
    DEnd: Timestamp.fromDate(DEnd),
    TEnd: TEnd,
  };
};

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;

const documentPath = (uid: string, lid: string) =>
  `${CollectionPath(uid)}/${lid}`;

const CreateModel = () => CreateTable(constants.document, constants.data);
const DeleteModel = () => DeleteTable(constants.document);
const Clear = () => ResetTable(constants.document);

const GetAll = () =>
  ReadRowData(constants.document).then((response) =>
    response.values!.map((note) => ToProps(note, "LocalProps"))
  );

const Get = (lid: string) =>
  ReadRowData(constants.document, { key: "lid", value: lid }).then((response) =>
    ToProps(response.values![0], "LocalProps")
  );

const Add = async (props: Props, uid?: string) => {
  const localProps = ToLocalProps(props, "Props");
  const data = ObjectToMap(localProps);
  if (!!uid)
    await SetDocument(
      documentPath(uid, props.lid),
      ToCloudProps(props, "Props")
    );
  return InsertRowData(constants.document, {
    keys: Array.from(data.keys()),
    values: Array.from(data.values()),
  }).then(() => props);
};

const Remove = (lid: string) =>
  DeleteRowData(constants.document, { key: "lid", value: lid });

const Sync = async (uid: string, lid: string) =>
  GetDocument(documentPath(uid, lid)).then(async (response) => {
    const cloudProps = response!.data()!;
    const localProps = ToLocalProps(cloudProps, "CloudProps");
    const data = ObjectToMap(localProps);
    return InsertRowData(
      constants.document,
      {
        keys: Array.from(data.keys()),
        values: Array.from(data.values()),
      },
      true
    ).then(() => Get(lid));
  });

const SyncAll = async (uid: string) =>
  GetCollection(CollectionPath(uid)).then(async (value) => {
    let temp = new Array<Props>();
    for (let cloudProps of value!.values) {
      const response = await Sync(uid, cloudProps.lid);
      temp.push(response);
    }
    return temp;
  });

export type { Props, LocalProps, CloudProps };
export {
  Enums,
  CreateModel,
  DeleteModel,
  Clear,
  Add,
  GetAll,
  Get,
  Remove,
  Sync,
  SyncAll,
};
