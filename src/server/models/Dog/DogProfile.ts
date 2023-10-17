import { ConnectDB, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../../sqlite";

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
    birthday: Date,
    breed: string,
    color: string,
    inoutdoor: number,
    fixing: number
};

const modelColumn = `
pid INTEGER PRIMARY KEY NOT NULL,
uid TEXT,
name TEXT,
birthday TEXT,
breed TEXT,
color TEXT,
inoutdoor INTEGER,
fixing INTEGER
`;

const ConvertToMap = (props: Props) => {
    const temp = new Map();
    temp.set(props.pid.toString(), props.pid);
    temp.set(props.uid.toString(), props.uid);
    temp.set(props.name.toString(), props.name);
    temp.set(props.birthday.toString(), props.birthday);
    temp.set(props.breed.toString(), props.breed);
    temp.set(props.color.toString(), props.color);
    temp.set(props.inoutdoor.toString(), props.inoutdoor);
    temp.set(props.fixing.toString(), props.fixing);
    return temp;
}

const InsertData = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys()).join(', ');
    const values = Array.from(map.values()).join(', ');
    await ConnectDB("Dog", async (db) => await InsertRowData(db, "DogProfile", keys, values));
};
const ReadData = async (petID: string) => await ConnectDB("Dog", async (db) => await ReadRowData(db, "DogProfile", `pid = '${petID}'`));
const UpdateData = async (props: Props) => {
    const identifierKey = 'pid';
    let data = '';
    const map = ConvertToMap(props);
    map.forEach((key, value) => {
        if (identifierKey === key) return;
        data = `${key} = '${value}, '` + data;
    });
    await ConnectDB("Dog", async (db) => await UpdateRowData(db, "DogProfile", data, `${identifierKey} = '${props[identifierKey]}'`));
};
const DeleteData = async (petID: string) => await ConnectDB("Dog", async (db) => await DeleteRowData(db, "DogProfile", `pid = '${petID}'`));

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
    name: 'DogProfile',
    modelColumn: modelColumn
};