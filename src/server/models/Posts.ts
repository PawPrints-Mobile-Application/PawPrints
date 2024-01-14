import {
  SetDocument,
  GetDocument,
  GetCollection,
  DeleteDocument,
} from "../firebase";
import { Timestamp } from "firebase/firestore";

const constants = {
  collection: "Forums",
  document: "Posts",
  data: `
            fid TEXT PRIMARY KEY NOT NULL,
            uid TEXT,
            username TEXT,
            content TEXT,
            DTPost INTEGER,
            tags TEXT,
            comments TEXT,
            likes TEXT
            `,
};

type Props = {
  fid: string;
  uid: string;
  username: string;
  content: string;
  DTPost: Date;
  tags: Array<string>;
  comments: Array<string>;
  likes: Array<string>;
};

type CloudProps = {
  fid: string;
  uid: string;
  username: string;
  content: string;
  DTPost: Timestamp;
  tags: Array<string>;
  comments: Array<string>;
  likes: Array<string>;
};

const ToProps = (props: any): Props => {
  return {
    fid: props.fid,
    uid: props.uid,
    username: props.username,
    content: props.content,
    DTPost: props.DTPost.toDate(),
    tags: props.tags,
    comments: props.comments,
    likes: props.likes,
  };
};

const ToCloudProps = (props: any): CloudProps => {
  return {
    fid: props.fid,
    uid: props.uid,
    username: props.username,
    content: props.content,
    DTPost: Timestamp.fromDate(props.DTPost),
    tags: props.tags,
    comments: props.comments,
    likes: props.likes,
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
