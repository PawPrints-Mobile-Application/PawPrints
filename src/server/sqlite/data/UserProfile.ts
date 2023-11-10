import {
  CreateTable as MakeTable,
  InsertRowData,
  ReadFirstRow,
  UpdateFirstRowData,
  DeleteRowData,
  DeleteTable as RemoveTable,
} from "..";
import { Props } from "../../models/UserProfile";
const documentName = "UserProfile";
const columns = `
uid TEXT PRIMARY KEY NOT NULL,
email TEXT,
username TEXT,
subscription TEXT,
DTCreated TEXT

`;
const ConvertToMap = (props: Props) => {
  const temp = new Map();
  temp.set("uid", props.uid);
  temp.set("email", props.email);
  temp.set("username", props.username);
  temp.set("subscription", props.subscription);
  temp.set("DTCreated", props.DTCreated);
  return temp;
};

const DeleteTable = async () => await RemoveTable(documentName);
const CreateTable = async () => await MakeTable(documentName, columns);

const ChangeUser = async (props: Props) => {
  console.log("Local Database Login");
  const map = ConvertToMap(props);
  const keys = Array.from(map.keys());
  const values = Array.from(map.values());
  return await InsertRowData(documentName, { keys, values });
};

const DeleteUser = async () => {
  console.log("Local Database Logout");
  return await DeleteRowData(documentName);
};

const GetUser = async () => await ReadFirstRow(documentName);

const UpdateUser = async (props: Props) => {
  const map = ConvertToMap(props);
  const keys = Array.from(map.keys());
  const values = Array.from(map.values());
  return await UpdateFirstRowData(documentName, { keys, values });
};

export {
  ConvertToMap,
  CreateTable,
  ChangeUser,
  DeleteUser,
  GetUser,
  UpdateUser,
  DeleteTable,
};
