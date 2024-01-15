import {
  SetDocument,
  GetDocument,
  GetCollection,
  DeleteDocument,
} from "../firebase";
import { Timestamp } from "firebase/firestore";

const constants = {
  collection: "Forums",
  document: "Comments",
  data: `
    cid TEXT PRIMARY KEY NOT NULL,
    uid TEXT,
    fid TEXT,
    username TEXT,
    content TEXT,
    DTPost INTEGER
              `,
};

type Props = {
  cid: string;
  fid: string;
  uid: string;
  username: string;
  content: string;
  DTPost: Date;
};

type CloudProps = {
  cid: string;
  fid: string;
  uid: string;
  username: string;
  content: string;
  DTPost: Timestamp;
};

const ToProps = (props: any): Props => {
  return {
    cid: props.fid,
    fid: props.uid,
    uid: props.username,
    username: props.content,
    content: props.tags,
    DTPost: props.DTPost.toDate(),
  };
};

const ToCloudProps = (props: any): CloudProps => {
  return {
    cid: props.fid,
    fid: props.uid,
    uid: props.username,
    username: props.content,
    content: props.tags,
    DTPost: Timestamp.fromDate(props.DTPost),
  };
};

const CollectionPath = () =>
  `${constants.collection}/${constants.document}/${constants.document}`;
const DocumentPath = (fid: string) => `${CollectionPath()}/${fid}`;

const Get = (fid: string) => GetDocument(DocumentPath(fid));

const Add = async (props: Props) =>
  SetDocument(DocumentPath(props.fid), ToCloudProps(props));

const Remove = (fid: string) => DeleteDocument(DocumentPath(fid));

const Sync = async (fid: string) =>
  GetDocument(DocumentPath(fid)).then(async (response) =>
    ToProps(response!.data()!)
  );

const SyncAll = async (callback: (value: Props, fid: string) => void) =>
  GetCollection(CollectionPath()).then(async (value) => {
    let temp = new Array<Props>();
    for (let cloudProps of value!.values) {
      const response = await Sync(cloudProps.fid);
      temp.push(response);
      callback(response, cloudProps.fid);
    }
    return temp;
  });

export type { Props, CloudProps };
export { Add, Get, Remove, Sync, SyncAll };
