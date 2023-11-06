import { CreateTable as MakeTable, DeleteTable as RemoveTable, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../..";
import { Props } from "../../../models/Cache/LoginHistory";
const collectionName = 'Guest'; // TODO: change to 'Users
const documentName = 'LoginHistory';
const columns = `
DTSignin TEXT PRIMARY KEY UNIQUE NOT NULL,
DSignin TEXT,
TSignin TEXT,
DTSignout TEXT,
uid TEXT
`;

const ConvertToDTSignin = (DSignin: string, TSignin: string) => `${DSignin} , ${TSignin}`;
const ConvertToMap = (props: Props, DTSignout: string = '') => {
    const temp = new Map();
    temp.set('DTSignin', ConvertToDTSignin(props.DSignin, props.TSignin));
    temp.set('DSignin', props.DSignin);
    temp.set('TSignin', props.TSignin);
    temp.set('DTSignout', DTSignout);
    temp.set('uid', props.uid);
    return temp;
}

const CreateTable = async () => {
    await MakeTable(collectionName, documentName, columns);
}

const DeleteTable = async () => {
    await RemoveTable(collectionName, documentName);
}

const LoginUser = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await InsertRowData(collectionName, documentName, {keys, values});
};

const GetAllLogs = async () => await ReadRowData(collectionName, documentName);

const GetUserLogs = async (email: string) => await ReadRowData(collectionName, documentName, {key: 'email', value: email});

const GetLogsOnDate = async (DSignin: string) => await ReadRowData(collectionName, documentName, {key: 'DSignin', value: DSignin});

const GetLogsOnTime = async (TSignin: string) => await ReadRowData(collectionName, documentName, {key: 'TSignin', value: TSignin});

const GetLogsOnDateTime = async (DSignin: string, TSignin: string) => await ReadRowData(collectionName, documentName, {key: 'DTSignin', value: ConvertToDTSignin(DSignin, TSignin)});

const LogoutUser = async (DTSignout: string) => {
    await UpdateRowData(collectionName, documentName, {keys: ['DTSignout'], values: [DTSignout]}, {key: 'DTSignout', value: DTSignout});
};

const ClearLogs = async () => {
    await DeleteRowData(collectionName, documentName);
}

const ClearLatestLog = async () => {
    await DeleteRowData(collectionName, documentName, {key: 'id', value: `(SELECT MAX(id) FROM ${documentName})`});
}

export type {
    Props
};

export {
    ConvertToDTSignin,
    ConvertToMap,

    CreateTable,
    DeleteTable,
    LoginUser,
    GetUserLogs,
    GetAllLogs,
    GetLogsOnDate,
    GetLogsOnTime,
    GetLogsOnDateTime,
    LogoutUser,
    ClearLogs,
    ClearLatestLog,
};