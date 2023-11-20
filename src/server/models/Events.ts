import {
  CreateTable,
  DeleteTable,
  ResetTable,
  InsertRowData,
  ReadRowData,
  DeleteRowData,
} from "../sqlite";
import { SetDocument, GetDocument, GetCollection } from "../firebase";
import ObjectToMap from "../../utils/ObectToMap";
import { Timestamp } from "firebase/firestore";
import { SeedGenerator, StringToArray } from "../../utils/";

const constants = {
  collection: "Users",
  document: "Events",
  data: `
      eid TEXT PRIMARY KEY NOT NULL,
      eventType TEXT,
      title TEXT,
      details TEXT,
      dogs TEXT,
      DTStart INTEGER,
      DTEnd INTEGER
      `,
  arraySplitter: ", ",
};

type Props = {
  eid: string;
  eventType: string;
  title: string;
  details: string;
  dogs: Array<string>;
  DTStart: Date;
  DTEnd: Date;
};

type LocalProps = {
  eid: string;
  eventType: string;
  title: string;
  details: string;
  dogs: string;
  DTStart: number;
  DTEnd: number;
};

type CloudProps = {
  eid: string;
  eventType: string;
  title: string;
  details: string;
  dogs: Array<string>;
  DTStart: Timestamp;
  DTEnd: Timestamp;
};

const ToProps = (props: any, source: "LocalProps" | "CloudProps"): Props => {
  let { DTStart, DTEnd, dogs } = props;
  if (source === "LocalProps") {
    dogs = StringToArray(props.dogs, constants.arraySplitter),
    DTStart = new Date(props.DTStart);
    DTEnd = new Date(props.DTEnd);
  } else {
    DTStart = props.DTStart.toDate();
    DTEnd = props.DTEnd.toDate();
  }
  return {
    eid: props.eid,
    eventType: props.eventType,
    title: props.title,
    details: props.details,
    dogs: dogs,
    DTStart: DTStart,
    DTEnd: DTEnd,
  };
};

const ToLocalProps = (
  props: any,
  source: "Props" | "CloudProps"
): LocalProps => {
  const dogs = props.dogs.join(constants.arraySplitter);
  let { DTStart, DTEnd } = props;
  if (source === "CloudProps") {
    DTStart = props.DTStart.toDate();
    DTEnd = props.DTEnd.toDate();
  }
  return {
    eid: props.eid,
    eventType: props.eventType,
    title: props.title,
    details: props.details,
    dogs: dogs,
    DTStart: SeedGenerator(DTStart),
    DTEnd: SeedGenerator(DTEnd),
  };
};

const ToCloudProps = (
  props: any,
  source: "Props" | "LocalProps"
): CloudProps => {
  let { DTStart, DTEnd, dogs } = props;
  if (source === "LocalProps") {
    dogs = props.dogs.split(constants.arraySplitter);
    DTStart = new Date(props.DTStart);
    DTEnd = new Date(props.DTEnd);
  }
  return {
    eid: props.eid,
    eventType: props.eventType,
    title: props.title,
    details: props.details,
    dogs: dogs,
    DTStart: Timestamp.fromDate(DTStart),
    DTEnd: Timestamp.fromDate(DTEnd),
  };
};

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;

const documentPath = (uid: string, eid: string) =>
  `${CollectionPath(uid)}/${eid}`;

const CreateModel = () => CreateTable(constants.document, constants.data);
const DeleteModel = () => DeleteTable(constants.document);
const Clear = () => ResetTable(constants.document);

const GetAll = () =>
  ReadRowData(constants.document).then((response) =>
    response.values!.map((note) => ToProps(note, "LocalProps"))
  );

const Get = (eid: string) =>
  ReadRowData(constants.document, { key: "eid", value: eid }).then((response) =>
    ToProps(response.values![0], "LocalProps")
  );

const Add = async (props: Props, uid?: string) => {
  const localProps = ToLocalProps(props, "Props");
  const data = ObjectToMap(localProps);
  if (!!uid)
    await SetDocument(
      documentPath(uid, props.eid),
      ToCloudProps(props, "Props")
    );
  return InsertRowData(constants.document, {
    keys: Array.from(data.keys()),
    values: Array.from(data.values()),
  }).then(() => props);
};

const Remove = (eid: string) =>
  DeleteRowData(constants.document, { key: "eid", value: eid });

const Sync = async (uid: string, eid: string) =>
  GetDocument(documentPath(uid, eid)).then(async (response) => {
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
    ).then(() => Get(eid));
  });

const SyncAll = async (uid: string) =>
  GetCollection(CollectionPath(uid)).then(async (value) => {
    let temp = new Array<Props>();
    for (let cloudProps of value!.values) {
      const response = await Sync(uid, cloudProps.eid);
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
