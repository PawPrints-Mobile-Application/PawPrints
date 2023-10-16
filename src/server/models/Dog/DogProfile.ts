import { ConnectDB, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../../sqlite";

type InOutDoor = 'Indoor' | 'Outdoor';
type Fixing = 'Neutered' | 'Spayed' | 'None';
interface Props {
    pid: string,
    uid: string,
    name: string,
    birthday: Date,
    breed: string,
    color: string,
    inoutdoor: InOutDoor,
    fixing: Fixing
};

const modelColumn = `
pid INTEGER PRIMARY KEY NOT NULL,
uid TEXT,
name TEXT,
birthday TEXT,
breed TEXT,
color TEXT,
inoutdoor TEXT,
fixing TEXT
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

const InsertData = (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys()).join(', ');
    const values = Array.from(map.values()).join(', ');
    ConnectDB("Dog", (db) => InsertRowData(db, "DogProfile", keys, values));
};
const ReadData = (petID: string) => ConnectDB("Dog", (db) => ReadRowData(db, "DogProfile", `pid = '${petID}'`));
const UpdateData = (petID: string, props: Props) => {
    const identifierKey = 'pid';
    let data = '';
    const map = ConvertToMap(props);
    map.forEach((key, value) => {
        if (identifierKey === key) return;
        data = `${key} = '${value}, '` + data;
    });
    ConnectDB("Dog", (db) => UpdateRowData(db, "DogProfile", data, `${identifierKey} = '${petID}'`));
};
const DeleteData = (petID: string) =>  ConnectDB("Dog", (db) => ReadRowData(db, "DogProfile", `pid = '${petID}'`));

export type {
    Props
};

export {
    modelColumn,
    ConvertToMap,
    InsertData,
    ReadData,
    UpdateData,
    DeleteData
};

export default {
    name: 'DogProfile',
    modelColumn: modelColumn
};