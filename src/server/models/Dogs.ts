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
import { DropdownOption, EnumConstructor, StringToArray } from "../../utils";
import { DocumentData } from "firebase/firestore";

class InOutdoor extends EnumConstructor {
  indoor: "indoor" = "indoor";
  outdoor: "outdoor" = "outdoor";
  constructor() {
    super(["indoor", "outdoor"]);
  }
}
class Fixing extends EnumConstructor {
  none: "none" = "none";
  neutered: "neutered" = "neutered";
  spayed: "spayed" = "spayed";
  constructor() {
    super(["none", "neutered", "spayed"]);
  }
}
const Enums = {
  InOutdoor,
  Fixing,
};

const constants = {
  collection: "Users",
  document: "Dogs",
  data: `
    pid TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT,
    birthday TEXT,
    breed TEXT,
    color TEXT,
    logs TEXT
      `,
  arraySplitter: ", ",
};

type Props = {
  pid: string;
  name: string;
  birthday: string;
  breed: string;
  color: string;
  logs: Array<string>;
};

type LocalProps = {
  pid: string;
  name: string;
  birthday: string;
  breed: string;
  color: string;
  logs: string;
};

const ToProps = (props: LocalProps): Props => {
  return {
    pid: props.pid,
    name: props.name,
    birthday: props.birthday,
    breed: props.breed,
    color: props.color,
    logs: StringToArray(props.logs, constants.arraySplitter),
  };
};

const ToLocalProps = (props: Props | DocumentData): LocalProps => {
  return {
    pid: props.pid,
    name: props.name,
    birthday: props.birthday,
    breed:
      props.breed instanceof DropdownOption ? props.breed.value : props.breed,
    color: props.color,
    logs: props.logs.join(constants.arraySplitter),
  };
};

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;

const documentPath = (uid: string, pid: string) =>
  `${CollectionPath(uid)}/${pid}`;

const CreateModel = () => CreateTable(constants.document, constants.data);
const DeleteModel = () => DeleteTable(constants.document);
const Clear = () => ResetTable(constants.document);

const GetAll = () =>
  ReadRowData(constants.document).then((response) =>
    response.values!.map((note) => ToProps(note))
  );

const Get = (pid: string) =>
  ReadRowData(constants.document, { key: "pid", value: pid }).then((response) =>
    ToProps(response.values![0])
  );

const Add = async (props: Props, uid?: string) => {
  const localProps = ToLocalProps(props);
  const data = ObjectToMap(localProps);
  if (!!uid) await SetDocument(documentPath(uid, props.pid), props);
  return InsertRowData(
    constants.document,
    {
      keys: Array.from(data.keys()),
      values: Array.from(data.values()),
    },
    true
  ).then(() => props);
};

const Remove = (pid: string, uid?: string) =>
  DeleteRowData(constants.document, { key: "pid", value: pid }).then(() => {
    if (!!uid) return DeleteDocument(documentPath(uid, pid));
  });

const Sync = async (uid: string, pid: string) =>
  GetDocument(documentPath(uid, pid)).then(async (response) => {
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
    ).then(() => Get(pid));
  });

const SyncAll = async (uid: string) =>
  GetCollection(CollectionPath(uid)).then(async (value) => {
    let temp = new Array<Props>();
    for (let cloudProps of value!.values) {
      const response = await Sync(uid, cloudProps.pid);
      temp.push(response);
    }
    return temp;
  });

export type { Props, LocalProps };
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
