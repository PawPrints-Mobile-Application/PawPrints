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
};

type Props = {
  fid: string;
  uid: string;
  content: string;
  DTPost: Date;
  lastInteraction: Date;
  comments: Array<string>;
  likes: Array<string>;
};

type OtherProps = {
  fid: string;
  uid: string;
  content: string;
  DTPost: Timestamp;
  lastInteraction: Timestamp;
  comments: Array<string>;
  likes: Array<string>;
};

const ToProps = (props: any): Props => {
  return {
    fid: props.fid,
    uid: props.uid,
    content: props.content,
    DTPost: props.DTPost.toDate(),
    lastInteraction: props.lastInteraction.toDate(),
    comments: props.comments,
    likes: props.likes,
  };
};

const ToOtherProps = (props: any): OtherProps => {
  return {
    fid: props.fid,
    uid: props.uid,
    content: props.content,
    DTPost: Timestamp.fromDate(props.DTPost),
    lastInteraction: Timestamp.fromDate(props.lastInteraction),
    comments: props.comments,
    likes: props.likes,
  };
};

const CollectionPath = () =>
  `${constants.collection}/${constants.document}/${constants.document}`;
const DocumentPath = (fid: string) => `${CollectionPath()}/${fid}`;

const Set = async (props: Props) =>
  SetDocument(DocumentPath(props.fid), ToOtherProps(props));

const Remove = (fid: string) => DeleteDocument(DocumentPath(fid));

const Get = async (fid: string) =>
  GetDocument(DocumentPath(fid)).then(async (response) =>
    ToProps(response!.data()!)
  );

const GetAll = async () =>
  GetCollection(CollectionPath()).then(async (value) => {
    let temp = new Array<Props>();
    for (let cloudProps of value!.values) {
      const response = await Get(cloudProps.fid);
      temp.push(response);
    }
    return temp;
  });

export type { Props, OtherProps };
export { Set, Get, Remove, GetAll };
