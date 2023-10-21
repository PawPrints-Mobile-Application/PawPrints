import { CreateTable as MakeTable, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../..";

const dbName = 'Guest';
const modelName = 'UserProfile';

const columns = `
uid TEXT PRIMARY KEY NOT NULL,
firstName TEXT,
lastName TEXT,
email TEXT,
password TEXT,
subscription INTEGER
`;

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