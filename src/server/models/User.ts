import {
    CreateTable,
    DeleteTable,
    InsertRowData,
    ReadRowData,
    DeleteAllData,
    DeleteRowData,
  } from "./sqlite";
  import { SetDocument, GetDocument, GetCollection } from "../firebase";
  import { StringToArray, ObjectToMap } from "../../utils/";
  import { SQLiteDBConnection } from "@capacitor-community/sqlite";
  
  const constants = {
    collection: "Forums",
    document: "Users",
    data: `
              uid TEXT PRIMARY KEY NOT NULL,
              posts TEXT,
              commentedPosts TEXT,
              likedPosts TEXT
              `,
    arraySplitter: ", ",
  };
  
  type Props = {
    uid: string;
    posts: Array<string>;
    commentedPosts: Array<string>;
    likedPosts: Array<string>;
  };
  
  type LocalProps = {
    uid: string;
    posts: string;
    commentedPosts: string;
    likedPosts: string;
  };
  
  const ToProps = (props: any): Props => {
    return {
      uid: props.uid,
      posts: StringToArray(props.posts),
      commentedPosts: StringToArray(props.commentedPosts),
      likedPosts: StringToArray(props.likedPosts),
    };
  };
  
  const ToLocalProps = (props: any): LocalProps => {
    return {
      uid: props.uid,
      posts: props.posts.join(constants.arraySplitter),
      commentedPosts: props.commentedPosts.join(constants.arraySplitter),
      likedPosts: props.likedPosts.join(constants.arraySplitter),
    };
  };
  
  const CollectionPath = () =>
    `${constants.collection}/${constants.document}/${constants.document}`;
  
  const DocumentPath = (uid: string) => `${CollectionPath()}/${uid}`;
  
  const CreateModel = (db: SQLiteDBConnection) =>
    CreateTable(db, constants.document, constants.data);
  const DeleteModel = (db: SQLiteDBConnection) =>
    DeleteTable(db, constants.document);
  const ClearModel = (db: SQLiteDBConnection) =>
    DeleteAllData(db, constants.document);
  
  const GetAll = () =>
    ReadRowData(constants.document).then((response) =>
      response.values!.map((note) => ToProps(note))
    );
  
  const Get = (uid: string) =>
    ReadRowData(constants.document, { key: "uid", value: uid }).then((response) =>
      ToProps(response.values![0])
    );
  
  const Add = async (props: Props) => {
    const localProps = ToLocalProps(props);
    const data = ObjectToMap(localProps);
    await SetDocument(DocumentPath(props.uid), props);
    return InsertRowData(
      constants.document,
      {
        keys: Array.from(data.keys()),
        values: Array.from(data.values()),
      },
      true
    ).then(() => props);
  };
  
  const Remove = (uid: string) =>
    DeleteRowData(constants.document, { key: "uid", value: uid });
  
  const Sync = async (uid: string) =>
    GetDocument(DocumentPath(uid)).then(async (response) => {
      const cloudProps = response!.data()!;
      const localProps = ToLocalProps(cloudProps);
      const data = ObjectToMap(localProps);
      return InsertRowData(
        constants.document,
        {
          keys: Array.from(data.keys()),
          values: Array.from(data.values()),
        },
        true
      ).then(() => Get(uid));
    });
  
  const SyncAll = async () =>
    GetCollection(CollectionPath()).then(async (value) => {
      let temp = new Array<Props>();
      for (let cloudProps of value!.values) {
        const response = await Sync(cloudProps.uid);
        temp.push(response);
      }
      return temp;
    });
  
  export type { Props, LocalProps };
  export {
    CreateModel,
    DeleteModel,
    ClearModel,
    Add,
    GetAll,
    Get,
    Remove,
    Sync,
    SyncAll,
  };
  