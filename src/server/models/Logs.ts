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
import { SeedGenerator } from "../../utils/";

const constants = {
  collection: "Users",
  document: "Logs",
  data: `
        lid TEXT PRIMARY KEY NOT NULL,
        type TEXT,
        title TEXT,
        details TEXT,
        dogs TEXT,
        DTStart INTEGER,
        DTEnd INTEGER
        `,
  arraySplitter: ", ",
};

type Props = {
  lid: string;
  title: string;
  recordType: string;
  recordValue: number;
  recordUnits: string;
  DTStart: Date;
  DTEnd: Date;
  note: string;
};

type LocalProps = {
  lid: string;
  title: string;
  recordType: string;
  recordValue: number;
  recordUnits: string;
  DTStart: number;
  DTEnd: number;
  note: string;
};

type CloudProps = {
  lid: string;
  title: string;
  recordType: string;
  recordValue: number;
  recordUnits: string;
  DTStart: Timestamp;
  DTEnd: Timestamp;
  note: string;
};

const ToProps = (props: any, source: "LocalProps" | "CloudProps"): Props => {
  let { DTStart, DTEnd } = props;
  if (source === "LocalProps") {
    DTStart = new Date(props.DTStart);
    DTEnd = new Date(props.DTEnd);
  } else {
    DTStart = props.DTStart.toDate();
    DTEnd = props.DTEnd.toDate();
  }
  return {
    lid: props.lid,
    title: props.title,
    recordType: props.recordType,
    recordValue: props.recordValue,
    recordUnits: props.recordUnits,
    note: props.note,
    DTStart: DTStart,
    DTEnd: DTEnd,
  };
};

const ToLocalProps = (
  props: any,
  source: "Props" | "CloudProps"
): LocalProps => {
  let { DTStart, DTEnd, recordType } = props;
  if (source === "CloudProps") {
    DTStart = props.DTStart.toDate();
    DTEnd = props.DTEnd.toDate();
    recordType = props.recordType;
  } else {
    recordType = props.recordType.label;
  }
  return {
    lid: props.lid,
    title: props.title,
    recordType: recordType,
    recordValue: props.recordValue,
    recordUnits: props.recordUnits,
    note: props.note,
    DTStart: SeedGenerator(DTStart),
    DTEnd: SeedGenerator(DTEnd),
  };
};

const ToCloudProps = (
  props: any,
  source: "Props" | "LocalProps"
): CloudProps => {
  let { DTStart, DTEnd, recordType } = props;
  if (source === "LocalProps") {
    DTStart = new Date(props.DTStart);
    DTEnd = new Date(props.DTEnd);
    recordType = props.recordType;
  } else {
    recordType = props.recordType.label;
  }
  return {
    lid: props.lid,
    title: props.title,
    recordType: recordType,
    recordValue: props.recordValue,
    recordUnits: props.recordUnits,
    note: props.note,
    DTStart: Timestamp.fromDate(DTStart),
    DTEnd: Timestamp.fromDate(DTEnd),
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
