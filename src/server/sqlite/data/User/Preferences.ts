import { CreateTable as MakeTable, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../..";
import { Props } from "../../../models/User/Preferences";
const collectionName = 'Guest'; // TODO: change to 'Users
const documentName = 'Preferences';
const columns = `
uid TEXT PRIMARY KEY NOT NULL,
theme TEXT,
length INTEGER,
weight INTEGER,
temperature INTEGER
`;
const ConvertToMap = (props: Props) => {
    const temp = new Map();
    temp.set(props.uid.toString(), props.uid);
    temp.set(props.theme.toString(), props.theme);
    temp.set(props.length.toString(), props.length);
    temp.set(props.weight.toString(), props.weight);
    temp.set(props.temperature.toString(), props.temperature);
    return temp;
}

const CreateTable = async () => {
    await MakeTable(collectionName, documentName, columns);
}

const InsertData = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await InsertRowData(collectionName, documentName, {keys, values});
};

const GetAllData = async () => await ReadRowData(collectionName, documentName);

const GetData = async (uid: string) => await ReadRowData(collectionName, documentName, {key: 'uid', value: uid});

const UpdateData = async (props: Props) => {
    const identifierKey = 'uid';
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await UpdateRowData(collectionName, documentName, {keys, values}, {key: identifierKey, value: props[identifierKey]});
};

const DeleteAllData = async () => {
    await DeleteRowData(collectionName, documentName);
}

const DeleteData = async (uid: string) => {
    await DeleteRowData(collectionName, documentName, {key: 'uid', value: uid});
}

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