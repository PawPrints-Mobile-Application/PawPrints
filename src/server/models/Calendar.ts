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
import { DocumentData } from "firebase/firestore";
import { StringToArray } from "../../utils";

const constants = {
  collection: "Users",
  document: "Calendar",
  data: `
      did INTEGER PRIMARY KEY NOT NULL UNIQUE,
      events TEXT,
      notes TEXT
      `,
  arraySplitter: ", ",
};

type Props = {
  did: string;
  events: Array<string>;
  notes: Array<string>;
};

type LocalProps = {
  did: string;
  events: string;
  notes: string;
};

const ToProps = (props: LocalProps): Props => {
  return {
    did: props.did,
    events: StringToArray(props.events, constants.arraySplitter),
    notes: StringToArray(props.notes, constants.arraySplitter),
  };
};

const ToLocalProps = (props: Props | DocumentData): LocalProps => {
  return {
    did: props.did,
    events: props.events.join(constants.arraySplitter),
    notes: props.events.join(constants.arraySplitter),
  };
};

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;

const documentPath = (uid: string, did: string) =>
  `${CollectionPath(uid)}/${did}`;

const CreateModel = () => CreateTable(constants.document, constants.data);
const DeleteModel = () => DeleteTable(constants.document);
const Clear = () => ResetTable(constants.document);

const GetAll = () =>
  ReadRowData(constants.document).then((response) =>
    response.values!.map((note) => ToProps(note))
  );

const Get = (did: string) =>
  ReadRowData(constants.document, { key: "did", value: did }).then((response) =>
    ToProps(response.values![0])
  );

const Remove = (did: string) =>
  DeleteRowData(constants.document, { key: "did", value: did });

const Add = async (props: Props, uid?: string) => {
  const localProps = ToLocalProps(props);
  const data = ObjectToMap(localProps);
  if (!!uid) await SetDocument(documentPath(uid, props.did), props);
  return InsertRowData(constants.document, {
    keys: Array.from(data.keys()),
    values: Array.from(data.values()),
  }).then(() => props);
};

const Sync = async (uid: string, did: string) =>
  GetDocument(documentPath(uid, did)).then(async (response) => {
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
    ).then(() => Get(did));
  });

const SyncAll = async (uid: string) =>
  GetCollection(CollectionPath(uid)).then(async (value) => {
    let temp = new Array<Props>();
    for (let cloudProps of value!.values) {
      const response = await Sync(uid, cloudProps.did);
      temp.push(response);
    }
    return temp;
  });

export type { Props, LocalProps };
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
