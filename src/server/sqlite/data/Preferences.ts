import {
  CreateTable as MakeTable,
  InsertRowData,
  ReadFirstRow,
  UpdateFirstRowData,
  DeleteRowData,
} from "..";
import { Props } from "../../models/Preferences";
const documentName = "Preferences";
const columns = `
theme TEXT,
length INTEGER,
weight INTEGER,
temperature INTEGER
`;
const ConvertToMap = (props: Props) => {
  const temp = new Map();
  temp.set("theme", props.theme);
  temp.set("length", props.length);
  temp.set("weight", props.weight);
  temp.set("temperature", props.temperature);
  return temp;
};

const CreateTable = async () => await MakeTable(documentName, columns);

const ChangeUser = async (props: Props) => {
  console.log("Change User");
  const map = ConvertToMap(props);
  const keys = Array.from(map.keys());
  const values = Array.from(map.values());
  return DeleteRowData(documentName).then(
    async () => await InsertRowData(documentName, { keys, values })
  );
};

const DeleteUser = async () => {
  await DeleteRowData(documentName);
};

const GetUser = async () => await ReadFirstRow(documentName);

const UpdateUser = async (props: Props) => {
  const map = ConvertToMap(props);
  const keys = Array.from(map.keys());
  const values = Array.from(map.values());
  await UpdateFirstRowData(documentName, { keys, values });
};

export {
  ConvertToMap,
  CreateTable,
  ChangeUser,
  DeleteUser,
  GetUser,
  UpdateUser,
};
