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

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;

const documentPath = (uid: string, nid: string) =>
  `${CollectionPath(uid)}/${nid}`;

const CreateModel = () => CreateTable(constants.document, constants.data);
const DeleteModel = () => DeleteTable(constants.document);
const Clear = () => ResetTable(constants.document);

const GetAll = () =>
  ReadRowData(constants.document).then((response) =>
    response.values!.map((note) => ToProps(note, "LocalProps"))
  );

const Get = (nid: string) =>
  ReadRowData(constants.document, { key: "nid", value: nid }).then((response) =>
    ToProps(response.values![0], "LocalProps")
  );

const Add = async (props: Props, uid?: string) => {
  const localProps = ToLocalProps(props, "Props");
  const data = ObjectToMap(localProps);
  if (!!uid)
    await SetDocument(
      documentPath(uid, props.nid),
      ToCloudProps(props, "Props")
    );
  return InsertRowData(constants.document, {
    keys: Array.from(data.keys()),
    values: Array.from(data.values()),
  }).then(() => props);
};

const Remove = (nid: string) =>
  DeleteRowData(constants.document, { key: "nid", value: nid });

const Sync = async (uid: string, nid: string) =>
  GetDocument(documentPath(uid, nid)).then(async (response) => {
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

const SyncAll = async (uid: string) =>
  GetCollection(CollectionPath(uid)).then(async (value) => {
    let temp = new Array<Props>();
    for (let cloudProps of value!.values) {
      const response = await Sync(uid, cloudProps.nid);
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
