import { CreateTable as MakeTable, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../..";
import { ConvertToDTSignin } from "./LoginHistory";

const dbName = 'Guest';
const modelName = 'Accounts';
const columns = `
email TEXT PRIMARY KEY UNIQUE NOT NULL,
uid TEXT,
username TEXT,
password TEXT,
firstName TEXT,
lastName TEXT,
accountType INTEGER,
DTCreated TEXT
`;


const Enum = {
    accountType: {
        0: 'Guest',
        1: 'Firebase'
    }
};
interface Props {
    email: string,
    uid: string | undefined,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    accountType: number,
    DTCreated: string
};

const ConvertToMap = (props: Props) => {
    const temp = new Map();
    temp.set('email', props.email);
    temp.set('uid', props.uid);
    temp.set('username', props.username);
    temp.set('password', props.password);
    temp.set('firstName', props.firstName);
    temp.set('lastName', props.lastName);
    temp.set('accountType', props.accountType);
    temp.set('DTCreated', props.DTCreated);
    return temp;
}

const CreateTable = async () => {
    await MakeTable(dbName, modelName, columns);
}

const CreateUser = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await InsertRowData(dbName, modelName, {keys, values});
};

const GetAllUsers = async () => await ReadRowData(dbName, modelName);

const GetUser = async (email: string) => await ReadRowData(dbName, modelName, {key: 'email', value: email});

const UpdateUser = async (props: Props) => {
    const identifierKey = 'email';
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await UpdateRowData(dbName, modelName, {keys, values}, {key: identifierKey, value: props[identifierKey]});
};

const ClearTable = async () => {
    await DeleteRowData(dbName, modelName);
}

const DeleteUser = async (email: string) => {
    await DeleteRowData(dbName, modelName, {key: 'email', value: email});
}

export type {
    Props
};

export {
    ConvertToDTSignin,
    ConvertToMap,
    
    CreateTable,
    CreateUser,
    GetUser,
    GetAllUsers,
    UpdateUser,
    DeleteUser,
    ClearTable,

    Enum
};

export default {
    name: modelName,
    columns: columns
};