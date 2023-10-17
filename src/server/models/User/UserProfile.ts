import { ConnectDB, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../../sqlite";

const Enum = {
    subscription: {
        0: 'Free',
        1: 'Pawmium'
    }
};
interface Props {
    uid: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    subscription: number,
};

const modelColumn = `
uid TEXT PRIMARY KEY NOT NULL,
firstName TEXT,
lastName TEXT,
email TEXT,
password TEXT,
subscription INTEGER
`;

const ConvertToMap = (props: Props) => {
    const temp = new Map();
    temp.set(props.uid.toString(), props.uid);
    temp.set(props.firstName.toString(), props.firstName);
    temp.set(props.lastName.toString(), props.lastName);
    temp.set(props.email.toString(), props.email);
    temp.set(props.password.toString(), props.password);
    temp.set(props.subscription.toString(), props.subscription);
    return temp;
};

const InsertData = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys()).join(', ');
    const values = Array.from(map.values()).join(', ');
    await ConnectDB("User", async (db) => await InsertRowData(db, "UserProfile", keys, values));
};
const ReadData = async (userID: string) => await ConnectDB("User", async (db) => await ReadRowData(db, "UserProfile", `uid = '${userID}'`));
const UpdateData = async (props: Props) => {
    const identifierKey = 'uid';
    let data = '';
    const map = ConvertToMap(props);
    map.forEach((key, value) => {
        if (identifierKey === key) return;
        data = `${key} = '${value}, '` + data;
    });
    await ConnectDB("User", async (db) => await UpdateRowData(db, "UserProfile", data, `${identifierKey} = '${props[identifierKey]}'`));
};
const DeleteData = async (userID: string) => await ConnectDB("User", async (db) => await DeleteRowData(db, "UserProfile", `uid = '${userID}'`));

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
    name: 'UserProfile',
    modelColumn: modelColumn
};