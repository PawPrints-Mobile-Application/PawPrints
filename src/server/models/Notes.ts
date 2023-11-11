import {
  CreateTable,
  DeleteTable as RemoveTable,
  ResetTable,
  InsertRowData,
  ReadRowData,
} from "../sqlite";
import { SetDocument, GetDocument, GetCollection } from "../firebase";
import ObjectToMap from "../../utils/ObectToMap";
import { Timestamp } from "firebase/firestore";
import { SeedGenerator } from "../../utils/";

const constants = {
  collection: "Users",
  document: "Notes",
  data: `
      nid TEXT PRIMARY KEY NOT NULL UNIQUE,
      title TEXT,
      details TEXT,
      dogs TEXT,
      DTStart INTEGER,
      DTEnd INTEGER
      `,
  arraySplitter: ", ",
};

type Props = {
  nid: string;
  title: string;
  details: string;
  dogs: Array<string>;
  DTStart: Date;
  DTEnd: Date;
};

type LocalProps = {
  nid: string;
  title: string;
  details: string;
  dogs: string;
  DTStart: number;
  DTEnd: number;
};

type CloudProps = {
  nid: string;
  title: string;
  details: string;
  dogs: Array<string>;
  DTStart: Timestamp;
  DTEnd: Timestamp;
};

const ToProps = (props: any, source: "LocalProps" | "CloudProps"): Props => {
  let { DTStart, DTEnd, dogs } = props;
  if (source === "LocalProps") {
    dogs = props.dogs.split(constants.arraySplitter);
    DTStart = new Date(props.DTStart);
    DTEnd = new Date(props.DTEnd);
  } else {
    DTStart = props.DTStart.toDate();
    DTEnd = props.DTEnd.toDate();
  }
  return {
    nid: props.nid,
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
    nid: props.nid,
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
    nid: props.nid,
    title: props.title,
    details: props.details,
    dogs: dogs,
    DTStart: Timestamp.fromDate(DTStart),
    DTEnd: Timestamp.fromDate(DTEnd),
  };
};

const CollectionPath = () =>
  `${constants.collection}/${"ESgd5oubhOW33cYfsqZrFmhhLVf1"}/${
    constants.document
  }`;

const documentPath = (nid: string) => `${CollectionPath()}/${nid}`;

const Initialize = () => CreateTable(constants.document, constants.data);
const DeleteTable = () => RemoveTable(constants.document);
const Clear = () => ResetTable(constants.document);

const GetAll = () =>
  ReadRowData(constants.document).then((response) =>
    response.values!.map((note) => ToProps(note, "LocalProps"))
  );

const Get = (nid: string) =>
  ReadRowData(constants.document, { key: "nid", value: nid }).then((response) =>
    ToProps(response.values![0], "LocalProps")
  );

const Add = async (props: Props, sync: boolean = true) => {
  const localProps = ToLocalProps(props, "Props");
  const data = ObjectToMap(localProps);
  return InsertRowData(constants.document, {
    keys: Array.from(data.keys()),
    values: Array.from(data.values()),
  }).then(() => {
    if (!sync) return props;
    return SetDocument(
      documentPath(props.nid),
      ToCloudProps(props, "Props")
    ).then(() => props);
  });
};

const SyncNote = (nid: string) =>
  GetDocument(documentPath(nid)).then(async (response) => {
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
    ).then(() => Get(nid));
  });

const Sync = () =>
  GetCollection(CollectionPath()).then(async (value) => {
    let temp = new Array<Props>();
    for (let cloudProps of value!.values) {
      const response = await SyncNote(cloudProps.nid);
      temp.push(response);
    }
    return temp;
  });

export type { Props, LocalProps, CloudProps };
export { Initialize, DeleteTable, Clear, Add, GetAll, Get, SyncNote, Sync };
