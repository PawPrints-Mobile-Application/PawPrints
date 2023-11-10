import {
  CreateTable,
  DeleteTable as RemoveTable,
  ResetTable,
  InsertRowData,
  ReadRowData,
} from "../sqlite";
import { SetDocument, GetDocument } from "../firebase";
import ObjectToMap from "../../utils/ObectToMap";
import { DocumentData } from "firebase/firestore";

const constants = {
  collection: "Users",
  document: "Notes",
  data: `
      nid TEXT PRIMARY KEY NOT NULL,
      title TEXT,
      details TEXT,
      dogs TEXT
      `,
};

type LocalProps = {
  nid: string;
  title: string;
  details: string;
  dogs: string;
};

type CloudProps = {
  nid: string;
  title: string;
  details: string;
  dogs: Array<string>;
};

const ConvertToLocalProps = (props: CloudProps | DocumentData): LocalProps => {
  return {
    nid: props.nid,
    title: props.title,
    details: props.details,
    dogs: props.dogs.join(", "),
  };
};

const ConvertToCloudProps = (props: any): CloudProps => {
  return {
    nid: props.nid,
    title: props.title,
    details: props.details,
    dogs: props.dogs.split(", "),
  };
};

const documentPath = (nid: string) =>
  `${constants.collection}/${localStorage.getItem('authID')}/${
    constants.document
  }/${nid}`;

const Initialize = () => CreateTable(constants.document, constants.data);
const DeleteTable = () => RemoveTable(constants.document);
const Clear = () => ResetTable(constants.document);

const Get = () =>
  ReadRowData(constants.document).then((response) => ConvertToCloudProps(response.values!));

const Set = async (props: CloudProps, sync: boolean = true) => {
  const localProps = ConvertToLocalProps(props);
  const data = ObjectToMap(localProps);
  return InsertRowData(constants.document, {
    keys: Array.from(data.keys()),
    values: Array.from(data.values()),
  }).then(() => {
    if (!sync) return props;
    return SetDocument(documentPath(props.nid), props).then(() => props);
  });
};

const Sync = (nid: string) =>
  GetDocument(documentPath(nid)).then(async (response) => {
    console.log("syncing...");
    const cloudProps = response!.data()!;
    const localProps = ConvertToLocalProps(cloudProps);
    const data = ObjectToMap(localProps);
    return InsertRowData(constants.document, {
      keys: Array.from(data.keys()),
      values: Array.from(data.values()),
    }).then(Get);
  });

export type { LocalProps, CloudProps };
export { Initialize, DeleteTable, Clear, Set, Get, Sync };
