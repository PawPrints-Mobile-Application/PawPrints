import {
  CreateTable,
  DeleteTable,
  ResetTable,
  InsertRowData,
  ReadRowData,
  DeleteRowData,
} from "../sqlite";
import { SetDocument, GetDocument, GetCollection } from "../firebase";
import ObjectToMap from "../../utils/ObjectToMap";
import { Timestamp } from "firebase/firestore";
import { StringToArray } from "../../utils/";

const constants = {
  collection: "Users",
  document: "Logs",
  data: `
          fid TEXT PRIMARY KEY NOT NULL,
          uid TEXT,
          content TEXT,
          DTPost INTEGER,
          tags TEXT,
          comments TEXT,
          likes TEXT
          `,
  arraySplitter: ", ",
};

type Props = {
  fid: string;
  uid: string;
  content: string;
  DTPost: Date;
  tags: Array<string>;
  comments: Array<string>;
  likes: Array<string>;
};

type LocalProps = {
  fid: string;
  uid: string;
  content: string;
  DTPost: number;
  tags: string;
  comments: string;
  likes: string;
};

type CloudProps = {
  fid: string;
  uid: string;
  content: string;
  DTPost: Timestamp;
  tags: Array<string>;
  comments: Array<string>;
  likes: Array<string>;
};

const ToProps = (props: any, source: "LocalProps" | "CloudProps"): Props => {
  let { DTPost, tags, comments, likes } = props;
  if (source === "LocalProps") {
    DTPost = new Date(props.DTPost);
    tags = StringToArray(props.tags);
    comments = StringToArray(props.comments);
    likes = StringToArray(props.likes);
  } else {
    DTPost = props.DTPost.toDate();
  }
  return {
    fid: props.fid,
    uid: props.uid,
    content: props.content,
    DTPost: DTPost,
    tags: props.tags,
    comments: props.comments,
    likes: props.likes,
  };
};

const ToLocalProps = (
  props: any,
  source: "Props" | "CloudProps"
): LocalProps => {
  let { DTPost } = props;
  if (source === "CloudProps") {
    DTPost = props.DTPost.toDate();
  }
  return {
    fid: props.fid,
    uid: props.uid,
    content: props.content,
    DTPost: DTPost,
    tags: props.tags.join(constants.arraySplitter),
    comments: props.comments.join(constants.arraySplitter),
    likes: props.likes.join(constants.arraySplitter),
  };
};

const ToCloudProps = (
  props: any,
  source: "Props" | "LocalProps"
): CloudProps => {
    let { DTPost } = props;
    if (source === "LocalProps") {
      DTPost = new Date(props.DTPost);
    }
    return {
      fid: props.fid,
      uid: props.uid,
      content: props.content,
      DTPost: DTPost,
      tags: props.tags.join(constants.arraySplitter),
      comments: props.comments.join(constants.arraySplitter),
      likes: props.likes.join(constants.arraySplitter),
    };
};

const CollectionPath = (uid: string) =>
  `${constants.collection}/${uid}/${constants.document}`;

const documentPath = (uid: string, fid: string) =>
  `${CollectionPath(uid)}/${fid}`;

const CreateModel = () => CreateTable(constants.document, constants.data);
const DeleteModel = () => DeleteTable(constants.document);
const Clear = () => ResetTable(constants.document);

const GetAll = () =>
  ReadRowData(constants.document).then((response) =>
    response.values!.map((note) => ToProps(note, "LocalProps"))
  );

const Get = (fid: string) =>
  ReadRowData(constants.document, { key: "fid", value: fid }).then((response) =>
    ToProps(response.values![0], "LocalProps")
  );

const Add = async (props: Props, uid?: string) => {
  const localProps = ToLocalProps(props, "Props");
  const data = ObjectToMap(localProps);
  if (!!uid)
    await SetDocument(
      documentPath(uid, props.fid),
      ToCloudProps(props, "Props")
    );
  return InsertRowData(constants.document, {
    keys: Array.from(data.keys()),
    values: Array.from(data.values()),
  }).then(() => props);
};

const Remove = (fid: string) =>
  DeleteRowData(constants.document, { key: "fid", value: fid });

const Sync = async (uid: string, fid: string) =>
  GetDocument(documentPath(uid, fid)).then(async (response) => {
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
    ).then(() => Get(fid));
  });

const SyncAll = async (uid: string) =>
  GetCollection(CollectionPath(uid)).then(async (value) => {
    let temp = new Array<Props>();
    for (let cloudProps of value!.values) {
      const response = await Sync(uid, cloudProps.fid);
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
