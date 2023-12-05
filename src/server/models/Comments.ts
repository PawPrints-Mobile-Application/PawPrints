import {
    CreateTable,
    DeleteTable,
    ResetTable,
    InsertRowData,
    ReadRowData,
    DeleteRowData,
  } from "../sqlite";
  import { SetDocument, GetDocument, GetCollection } from "../firebase";
  import { StringToArray, ObjectToMap } from "../../utils/";
  import { Timestamp } from "firebase/firestore";
  
  const constants = {
    collection: "Forums",
    documentPosts: "Posts",
    documentComments: "Comments",
    dataPosts: `
            fid TEXT PRIMARY KEY NOT NULL,
            uid TEXT,
            content TEXT,
            DTPost INTEGER,
            tags TEXT,
            comments TEXT,
            likes TEXT
            `,
    dataComments: `
            cid TEXT PRIMARY KEY NOT NULL,
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
      tags: tags,
      comments: comments,
      likes: likes,
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
  
  const CollectionPathPosts = (uid: string) =>
    `${constants.collection}/${uid}/${constants.documentPosts}`;
  
  const documentPathPosts = (uid: string, fid: string) =>
    `${CollectionPathPosts(uid)}/${fid}`;
  
  const CollectionPathComment = (uid: string, fid: string) =>
    `${documentPathPosts(uid, fid)}/${constants.documentComments}`;
  
  const documentPathComments = (uid: string, fid: string, cid: string) =>
    `${CollectionPathComment(uid, fid)}/${cid}`;
  
  const CreateModel = () =>
    CreateTable(constants.documentPosts, constants.dataPosts);
  const DeleteModel = () => DeleteTable(constants.documentPosts);
  const Clear = () => ResetTable(constants.documentPosts);
  
  const GetAll = () =>
    ReadRowData(constants.documentPosts).then((response) =>
      response.values!.map((note) => ToProps(note, "LocalProps"))
    );
  
  const Get = (fid: string) =>
    ReadRowData(constants.documentPosts, { key: "fid", value: fid }).then(
      (response) => ToProps(response.values![0], "LocalProps")
    );
  
  const Add = async (props: Props, uid?: string) => {
    const localProps = ToLocalProps(props, "Props");
    const dataPosts = ObjectToMap(localProps);
    if (!!uid)
      await SetDocument(
        documentPathPosts(uid, props.fid),
        ToCloudProps(props, "Props")
      );
    return InsertRowData(constants.documentPosts, {
      keys: Array.from(dataPosts.keys()),
      values: Array.from(dataPosts.values()),
    }).then(() => props);
  };
  
  const Remove = (fid: string) =>
    DeleteRowData(constants.documentPosts, { key: "fid", value: fid });
  
  const Sync = async (uid: string, fid: string) =>
    GetDocument(documentPathPosts(uid, fid)).then(async (response) => {
      const cloudProps = response!.data()!;
      const localProps = ToLocalProps(cloudProps, "CloudProps");
      const dataPosts = ObjectToMap(localProps);
      return InsertRowData(
        constants.documentPosts,
        {
          keys: Array.from(dataPosts.keys()),
          values: Array.from(dataPosts.values()),
        },
        true
      ).then(() => Get(fid));
    });
  
  const SyncAll = async (uid: string) =>
    GetCollection(CollectionPathPosts(uid)).then(async (value) => {
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
  