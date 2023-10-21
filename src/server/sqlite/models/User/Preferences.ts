import { CreateTable as MakeTable, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../..";
import { Theme } from "../../../../theme";

const dbName = 'Guest';
const modelName = 'Preferences';
const columns = `
uid TEXT PRIMARY KEY NOT NULL,
theme TEXT,
length INTEGER,
weight INTEGER,
temperature INTEGER
`;


const Enum = {
    length: {
        0: 'Meter',
        1: 'Feet',
    },
    weight: {
        0: 'Kilogram',
        1: 'Pound'
    },
    temperature: {
        0: 'Celsius',
        1: 'Fahrenheit'
    },
    theme: Theme
};
interface Props {
    uid: string,
    theme: string,
    length: number,
    weight: number,
    temperature: number
};
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
    await MakeTable(dbName, modelName, columns);
}

const InsertData = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await InsertRowData(dbName, modelName, {keys, values});
};

const GetAllData = async () => await ReadRowData(dbName, modelName);

const GetData = async (uid: string) => await ReadRowData(dbName, modelName, {key: 'uid', value: uid});

const UpdateData = async (props: Props) => {
    const identifierKey = 'uid';
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await UpdateRowData(dbName, modelName, {keys, values}, {key: identifierKey, value: props[identifierKey]});
};

const DeleteAllData = async () => {
    await DeleteRowData(dbName, modelName);
}

const DeleteData = async (uid: string) => {
    await DeleteRowData(dbName, modelName, {key: 'uid', value: uid});
}

export type {
    Props
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

    Enum
};

export default {
    name: modelName,
    columns: columns
};