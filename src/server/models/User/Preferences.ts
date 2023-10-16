import { ConnectDB, DisconnectDB, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../../sqlite";
import { Theme } from "../../../theme";

type Length = 'Meter' |  'Feet';
type Weight = 'Kilogram' | 'Pound';
type Temperature = 'Celsius' | 'Fahrenheit';
interface Props {
    uid: string,
    theme: Theme,
    length: Length,
    weight: Weight,
    temperature: Temperature
};

const modelColumn = `
uid TEXT PRIMARY KEY NOT NULL,
theme TEXT,
length TEXT,
weight TEXT,
temperature TEXT
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
    const { sqlite, db } = await ConnectDB("User");
    InsertRowData(db, "Preferences", keys, values);
    await DisconnectDB(sqlite, 'User');
};
const ReadData = async (userID: string) => {
    const { sqlite, db } = await ConnectDB("User");
    ReadRowData(db, "Preferences", `uid = '${userID}'`);
    await DisconnectDB(sqlite, 'User');
};
const UpdateData = async (userID: string, props: Props) => {
    const identifierKey = 'uid';
    let data = '';
    const map = ConvertToMap(props);
    map.forEach((key, value) => {
        if (identifierKey === key) return;
        data = `${key} = '${value}, '` + data;
    });
    const { sqlite, db } = await ConnectDB("User");
    UpdateRowData(db, "Preferences", data, `${identifierKey} = '${userID}'`);
    await DisconnectDB(sqlite, 'User');
};
const DeleteData = async (userID: string) => {
    const { sqlite, db } = await ConnectDB("User");
    DeleteRowData(db, "Preferences", `uid = '${userID}'`);
    await DisconnectDB(sqlite, 'User');
};

export type {
    Props
};

export {
    modelColumn,
    ConvertToMap,
    InsertData,
    ReadData,
    UpdateData,
    DeleteData
};

export default {
    name: 'Preferences',
    modelColumn: modelColumn
};