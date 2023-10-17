import { ConnectDB, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../../sqlite";
import { DBSQLiteValues } from "@capacitor-community/sqlite";

const Enum = {
    accountType: {
        0: 'Guest',
        1: 'Firebase'
    }
};
interface Props {
    uid: string | undefined,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType: number,
    DTCreated: string
};

const modelColumn = `
email TEXT PRIMARY KEY,
uid TEXT NOT NULL,
firstName TEXT,
lastName TEXT,
password TEXT,
accountType INTEGER,
DTCreated TEXT
`;

const ConvertToMap = (props: Props) => {
    const temp = new Map();
    temp.set('email', props.email);
    temp.set('uid', props.uid);
    temp.set('firstName', props.firstName);
    temp.set('lastName', props.lastName);
    temp.set('password', props.password);
    temp.set('accountType', props.accountType);
    temp.set('DTCreated', props.DTCreated);
    return temp;
}

const InsertData = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys()).join(', ');
    const values = Array.from(map.values());
    await ConnectDB("Temps", async (db) => await InsertRowData(db, "Accounts", keys, values));
};
const ReadDataByEmail = async (email: string) => await ConnectDB("Temps", async (db) => (await ReadRowData(db, "Accounts", `email = '${email}'`)).values);
const ReadDataByUID = async (userID: string) => await ConnectDB("Temps", async (db) => (await ReadRowData(db, "Accounts", `uid = '${userID}'`)).values);
const UpdateData = async (props: Props) => {
    const identifierKey = 'uid';
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await ConnectDB("Temps", async (db) => await UpdateRowData(db, "Accounts", keys, values, `${identifierKey} = '${props[identifierKey]}'`));
};
const DeleteData = async (userID: string) => await ConnectDB("Temps", async (db) => await DeleteRowData(db, "Accounts", `uid = '${userID}'`));

export type {
    Props
};

export {
    modelColumn,
    ConvertToMap,
    InsertData,
    ReadDataByEmail,
    ReadDataByUID,
    UpdateData,
    DeleteData,

    Enum
};

export default {
    name: 'Accounts',
    modelColumn: modelColumn
};