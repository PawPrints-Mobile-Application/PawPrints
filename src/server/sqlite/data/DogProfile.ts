import {
  CreateTable as MakeTable,
  InsertRowData,
  ReadRowData,
  UpdateRowData,
  DeleteRowData,
} from "..";
import { Props } from "../../models/DogProfile";
const documentName = "DogProfile";
const columns = `
pid TEXT PRIMARY KEY UNIQUE NOT NULL,
uid TEXT ,
name TEXT,
birthday TEXT,
breed TEXT,
color TEXT,
inoutdoor INTEGER,
fixing INTEGER
`;
const ConvertToMap = (props: Props) => {
  const temp = new Map();
  temp.set("pid", props.pid);
  temp.set("uid", props.uid);
  temp.set("name", props.name);
  temp.set("birthday", props.birthday);
  temp.set("breed", props.breed);
  temp.set("color", props.color);
  temp.set("inoutdoor", props.inoutdoor);
  temp.set("fixing", props.fixing);
  return temp;
};

const CreateTable = async () => await MakeTable(documentName, columns);

const InsertData = async (props: Props) => {
  const map = ConvertToMap(props);
  const keys = Array.from(map.keys());
  const values = Array.from(map.values());
  await InsertRowData(documentName, { keys, values }, true);
};

const GetAllData = async () => await ReadRowData(documentName);

const GetData = async (pid: string) =>
  await ReadRowData(documentName, { key: "pid", value: pid });

const UpdateData = async (props: Props) => {
  const identifierKey = "pid";
  const map = ConvertToMap(props);
  const keys = Array.from(map.keys());
  const values = Array.from(map.values());
  await UpdateRowData(
    documentName,
    { keys, values },
    { key: identifierKey, value: props[identifierKey] }
  );
};

const DeleteAllData = async () => {
  await DeleteRowData(documentName);
};

const DeleteData = async (pid: string) => {
  await DeleteRowData(documentName, { key: "pid", value: pid });
};

export {
  ConvertToMap,
  CreateTable,
  InsertData,
  GetData,
  GetAllData,
  UpdateData,
  DeleteData,
  DeleteAllData,
};
