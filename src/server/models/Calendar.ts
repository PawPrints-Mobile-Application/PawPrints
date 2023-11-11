import {
  CreateTable,
  DeleteTable as RemoveTable,
  ResetTable,
  InsertRowData,
  ReadRowData,
} from "../sqlite";
import { SetDocument, GetDocument, GetCollection } from "../firebase";
import ObjectToMap from "../../utils/ObectToMap";
import { DocumentData } from "firebase/firestore";

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
    events: props.events.split(constants.arraySplitter),
    notes: props.events.split(constants.arraySplitter),
  };
};

const ToLocalProps = (props: Props | DocumentData): LocalProps => {
  return {
    did: props.did,
    events: props.events.join(constants.arraySplitter),
    notes: props.events.join(constants.arraySplitter),
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
    response.values!.map((note) => ToProps(note))
  );

const Get = (nid: string) =>
  ReadRowData(constants.document, { key: "nid", value: nid }).then((response) =>
    ToProps(response.values![0])
  );

const Add = async (props: Props, sync: boolean = true) => {
  const localProps = ToLocalProps(props);
  const data = ObjectToMap(localProps);
  return InsertRowData(constants.document, {
    keys: Array.from(data.keys()),
    values: Array.from(data.values()),
  }).then(() => {
    if (!sync) return props;
    return SetDocument(documentPath(props.did), props).then(() => props);
  });
};

const SyncNote = (nid: string) =>
  GetDocument(documentPath(nid)).then(async (response) => {
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

export type { Props, LocalProps };
export { Initialize, DeleteTable, Clear, Add, GetAll, Get, SyncNote, Sync };
