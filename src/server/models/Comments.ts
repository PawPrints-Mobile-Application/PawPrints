import {
  SetDocument,
  GetDocument,
  GetCollection,
  DeleteDocument,
} from "../firebase";
import { Timestamp } from "firebase/firestore";
import { Get as GetPost, Props as PropsPost, Set as SetPost } from "./Posts";

const constants = {
  collection: "Forums",
  document: "Comments",
};

type Props = {
  cid: string;
  fid: string;
  uid: string;
  content: string;
  DTPost: Date;
};

type OtherProps = {
  cid: string;
  fid: string;
  uid: string;
  content: string;
  DTPost: Timestamp;
};

const ToProps = (props: any): Props => {
  return {
    cid: props.cid,
    fid: props.fid,
    uid: props.uid,
    content: props.content,
    DTPost: props.DTPost.toDate(),
  };
};

const ToOtherProps = (props: any): OtherProps => {
  return {
    cid: props.cid,
    fid: props.fid,
    uid: props.uid,
    content: props.content,
    DTPost: Timestamp.fromDate(props.DTPost),
  };
};

const CollectionPath = () =>
  `${constants.collection}/${constants.document}/${constants.document}`;
const DocumentPath = (cid: string) => `${CollectionPath()}/${cid}`;

const Set = async (props: Props) =>
  SetDocument(DocumentPath(props.cid), ToOtherProps(props))
    .then(() => GetPost(props.fid))
    .then((post: PropsPost) => {
      post.comments.push(props.cid);
      return SetPost(post);
    });

const Remove = (cid: string) => DeleteDocument(DocumentPath(cid));

const Get = async (cid: string) =>
  GetDocument(DocumentPath(cid)).then(async (response) =>
    ToProps(response!.data()!)
  );

const GetAll = async () =>
  GetCollection(CollectionPath()).then(async (value) => {
    let temp = new Array<Props>();
    for (let cloudProps of value!.values) {
      const response = await Get(cloudProps.cid);
      temp.push(response);
    }
    return temp;
  });

export type { Props, OtherProps };
export { Set, Get, Remove, GetAll };
