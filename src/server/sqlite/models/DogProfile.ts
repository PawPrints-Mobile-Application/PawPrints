import { ConnectDB, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "..";

const name = 'DogProfile';
const columns = `
pid INTEGER PRIMARY KEY UNIQUE NOT NULL,
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
    pid: number,
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
    temp.set('name', props.name);
    temp.set('birthday', props.birthday);
    temp.set('breed', props.breed);
    temp.set('color', props.color);
    temp.set('inoutdoor', props.inoutdoor);
    temp.set('fixing', props.fixing);
    return temp;
}

const InsertData = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await ConnectDB((db) => InsertRowData(db, name, {keys, values}));
};

const GetAllData = async () => await ConnectDB((db) => ReadRowData(db, name));

const GetData = async (petID: string) => await ConnectDB((db) => ReadRowData(db, name, {key: 'petID', value: petID}));

const UpdateData = async (props: Props) => {
    const identifierKey = 'pid';
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await ConnectDB((db) => UpdateRowData(db, name, {keys, values}, {key: identifierKey, value: props[identifierKey]}));
};

const DeleteAllData = async () => await ConnectDB((db) => DeleteRowData(db, name));

const DeleteData = async (petID: string) => await ConnectDB((db) => DeleteRowData(db, name, {key: 'petID', value: petID}));

export type {
    Props
};

export {
    columns,
    ConvertToMap,
    InsertData,
    GetData,
    GetAllData,
    UpdateData,
    DeleteData,
    DeleteAllData,

    Enum
};

export default {
    name: name,
    columns: columns
};