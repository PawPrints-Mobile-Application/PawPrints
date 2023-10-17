import { ConnectDB, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../../sqlite";
import { Theme } from "../../../theme";

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

const modelColumn = `
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

const InsertData = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys()).join(', ');
    const values = Array.from(map.values()).join(', ');
    await ConnectDB("User", async (db) => await InsertRowData(db, "Preferences", keys, values));
};
const ReadData = async (userID: string) => await ConnectDB("User", async (db) => await ReadRowData(db, "Preferences", `uid = '${userID}'`));
const UpdateData = async (props: Props) => {
    const identifierKey = 'uid';
    let data = '';
    const map = ConvertToMap(props);
    map.forEach((key, value) => {
        if (identifierKey === key) return;
        data = `${key} = '${value}, '` + data;
    });
    await ConnectDB("User", async (db) => await UpdateRowData(db, "Preferences", data, `${identifierKey} = '${props[identifierKey]}'`));
};
const DeleteData = async (userID: string) => await ConnectDB("User", async (db) => await DeleteRowData(db, "Preferences", `uid = '${userID}'`));

export type {
    Props
};

export {
    modelColumn,
    ConvertToMap,
    InsertData,
    ReadData,
    UpdateData,
    DeleteData,

    Enum
};

export default {
    name: 'Preferences',
    modelColumn: modelColumn
};