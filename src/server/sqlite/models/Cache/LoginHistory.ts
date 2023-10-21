import { CreateTable as MakeTable, DeleteTable as RemoveTable, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../..";

const dbName = 'Guest';
const modelName = 'LoginHistory';
const columns = `
DTSignin TEXT PRIMARY KEY UNIQUE NOT NULL,
DSignin TEXT,
TSignin TEXT,
DTSignout TEXT,
uid TEXT
`;

const Enum = {
    
};
interface Props {
    DSignin: string,
    TSignin: string,
    uid: string | undefined
};

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
    await MakeTable(dbName, modelName, columns);
}

const DeleteTable = async () => {
    await RemoveTable(dbName, modelName);
}

const LoginUser = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await InsertRowData(dbName, modelName, {keys, values});
};

const GetAllLogs = async () => await ReadRowData(dbName, modelName);

const GetUserLogs = async (email: string) => await ReadRowData(dbName, modelName, {key: 'email', value: email});

const GetLogsOnDate = async (DSignin: string) => await ReadRowData(dbName, modelName, {key: 'DSignin', value: DSignin});

const GetLogsOnTime = async (TSignin: string) => await ReadRowData(dbName, modelName, {key: 'TSignin', value: TSignin});

const GetLogsOnDateTime = async (DSignin: string, TSignin: string) => await ReadRowData(dbName, modelName, {key: 'DTSignin', value: ConvertToDTSignin(DSignin, TSignin)});

const LogoutUser = async (DTSignout: string) => {
    await UpdateRowData(dbName, modelName, {keys: ['DTSignout'], values: [DTSignout]}, {key: 'DTSignout', value: DTSignout});
};

const ClearLogs = async () => {
    await DeleteRowData(dbName, modelName);
}

const ClearLatestLog = async () => {
    await DeleteRowData(dbName, modelName, {key: 'id', value: `(SELECT MAX(id) FROM ${modelName})`});
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

    Enum
};

export default {
    name: modelName,
    columns: columns
};