import { CreateTable as MakeTable, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../..";
import { Props } from "../../../models/Cache/Accounts";
import { ConvertToDTSignin } from "./LoginHistory";
const collectionName = 'Guest'; // TODO: change to 'Users
const documentName = 'Accounts';
const columns = `
email TEXT PRIMARY KEY UNIQUE NOT NULL,
uid TEXT,
username TEXT,
password TEXT,
accountType INTEGER,
DTCreated TEXT
`;

const ConvertToMap = (props: Props) => {
    const temp = new Map();
    temp.set('email', props.email);
    temp.set('uid', props.uid);
    temp.set('username', props.username);
    temp.set('password', props.password);
    temp.set('accountType', props.accountType);
    temp.set('DTCreated', props.DTCreated);
    return temp;
}

// const CreateTable = async () => {await MakeTable(collectionName, documentName, columns)}

const CreateTable = async () => await MakeTable(collectionName, documentName, columns).then(async () => await ClearTable());

const CreateUser = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await InsertRowData(collectionName, documentName, {keys, values});
};

const GetAllUsers = async () => await ReadRowData(collectionName, documentName);

const GetUser = async (email: string) => await ReadRowData(collectionName, documentName, {key: 'email', value: email});

const UpdateUser = async (props: Props) => {
    const identifierKey = 'email';
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await UpdateRowData(collectionName, documentName, {keys, values}, {key: identifierKey, value: props[identifierKey]});
};

const ClearTable = async () => {
    await DeleteRowData(collectionName, documentName);
}

const DeleteUser = async (email: string) => {
    await DeleteRowData(collectionName, documentName, {key: 'email', value: email});
}

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
};