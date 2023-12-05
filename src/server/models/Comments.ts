import {
  CreateTable,
  DeleteTable,
  ResetTable,
  InsertRowData,
  ReadRowData,
  DeleteRowData,
} from "../sqlite";
import { SetDocument, GetDocument, GetCollection } from "../firebase";
import { ObjectToMap, SeedGenerator } from "../../utils/";
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
  arraySplitter: ", ",
};

type Props = {
  cid: string;
  fid: string;
  uid: string;
  username: string;
  content: string;
  DTPost: Date;
};

type LocalProps = {
  cid: string;
  fid: string;
  uid: string;
  username: string;
  content: string;
  DTPost: number;
};

type CloudProps = {
  cid: string;
  fid: string;
  uid: string;
  username: string;
  content: string;
  DTPost: Timestamp;
};

const ToProps = (props: any, source: "LocalProps" | "CloudProps"): Props => {
  let { DTPost } = props;
  if (source === "LocalProps") {
    DTPost = new Date(props.DTPost);
  } else {
    DTPost = props.DTPost.toDate();
  }
  return {
    cid: props.cid,
    uid: props.uid,
    username: props.username,
    fid: props.uid,
    content: props.content,
    DTPost: DTPost,
  };
};

const ToLocalProps = (
  props: any,
  source: "Props" | "CloudProps"
): LocalProps => {
  let { DTPost } = props;
  if (source === "CloudProps") {
    DTPost = SeedGenerator(props.DTPost.toDate());
  } else {
    DTPost = SeedGenerator(props.DTPost);
  }
  return {
    cid: props.cid,
    uid: props.uid,
    username: props.username,
    fid: props.uid,
    content: props.content,
    DTPost: DTPost,
  };
};

const ToCloudProps = (
  props: any,
  source: "Props" | "LocalProps"
): CloudProps => {
  let { DTPost } = props;
  if (source === "LocalProps") {
    DTPost = Timestamp.fromDate(new Date(props.DTPost));
  } else {
    DTPost = Timestamp.fromDate(props.DTPost);
  }
  return {
    cid: props.cid,
    uid: props.uid,
    username: props.username,
    fid: props.uid,
    content: props.content,
    DTPost: DTPost,
  };
};

const CollectionPath = (fid: string) =>
  `${constants.collection}/Posts/Posts/${fid}/${constants.document}`;

const DocumentPath = (fid: string, cid: string) =>
  `${CollectionPath(fid)}/${cid}`;

const CreateModel = () => CreateTable(constants.document, constants.data);
const DeleteModel = () => DeleteTable(constants.document);
const Clear = () => ResetTable(constants.document);

const GetAll = () =>
  ReadRowData(constants.document).then((response) =>
    response.values!.map((note) => ToProps(note, "LocalProps"))
  );

const Get = (cid: string) =>
  ReadRowData(constants.document, { key: "cid", value: cid }).then((response) =>
    ToProps(response.values![0], "LocalProps")
  );

const Add = async (props: Props) =>
  SetDocument(DocumentPath(props.fid, props.cid), ToCloudProps(props, "Props"));

const Remove = (cid: string) =>
  DeleteRowData(constants.document, { key: "cid", value: cid });

const Sync = async (fid: string, cid: string) =>
  GetDocument(DocumentPath(fid, cid)).then(async (response) => {
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
    ).then(() => Get(cid));
  });

const SyncAll = async (fid: string) =>
  GetCollection(CollectionPath(fid)).then(async (value) => {
    for (let cloudProps of value!.values) {
      const localProps = ToLocalProps(cloudProps, "CloudProps");
      const data = ObjectToMap(localProps);
      await InsertRowData(
        constants.document,
        {
          keys: Array.from(data.keys()),
          values: Array.from(data.values()),
        },
        true
      );
    }
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
