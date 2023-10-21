import { CreateTable as MakeTable, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../..";

const dbName = 'Guest';
const modelName = 'DogProfile';
const columns = `
pid TEXT PRIMARY KEY UNIQUE NOT NULL,
uid TEXT ,
name TEXT,
birthday TEXT,
breed TEXT,
color TEXT,
inoutdoor INTEGER,
fixing INTEGER
`;

const Enum = {
    fixing: {
        0: 'None',
        1: 'Neutered',
        2: 'Spayed',
    },
    inoudoor: {
        0: 'indoor',
        1: 'outdoor'
    }
};
interface Props {
    pid: string,
    uid: string,
    name: string,
    birthday: string,
    breed: string,
    color: string,
    inoutdoor: number,
    fixing: number
};

const ConvertToMap = (props: Props) => {
    const temp = new Map();
    temp.set('pid', props.pid);
    temp.set('uid', props.pid);
    temp.set('name', props.name);
    temp.set('birthday', props.birthday);
    temp.set('breed', props.breed);
    temp.set('color', props.color);
    temp.set('inoutdoor', props.inoutdoor);
    temp.set('fixing', props.fixing);
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

const GetData = async (pid: string) => await ReadRowData(dbName, modelName, {key: 'pid', value: pid});

const UpdateData = async (props: Props) => {
    const identifierKey = 'pid';
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await UpdateRowData(dbName, modelName, {keys, values}, {key: identifierKey, value: props[identifierKey]});
};

const DeleteAllData = async () => {
    await DeleteRowData(dbName, modelName);
}

const DeleteData = async (pid: string) => {
    await DeleteRowData(dbName, modelName, {key: 'pid', value: pid});
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