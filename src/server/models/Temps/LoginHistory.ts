import { ConnectDB, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../../sqlite";

interface Props {
    DTSignin: string,
    DTSignout: string,
    uid: string | undefined
};

// const modelColumn = `
// DTSignin TEXT PRIMARY KEY NOT NULL,
// DTSignout TEXT,
// uid TEXT,
// FOREIGN KEY (uid)
//    REFERENCES Accounts (uid) 
// `;

const modelColumn = `
DTSignin TEXT PRIMARY KEY NOT NULL,
DTSignout TEXT,
uid TEXT
`;

const ConvertToMap = (props: Props) => {
    const temp = new Map();
    temp.set('DTSignin', props.DTSignin);
    temp.set('DTSignout', props.DTSignout);
    temp.set('uid', props.uid);
    return temp;
}

const InsertData = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys()).join(', ');
    const values = Array.from(map.values());
    await ConnectDB("Temps", async (db) => await InsertRowData(db, "LoginHistory", keys, values));
};
const ReadData = async (DTSignin: string) => await ConnectDB("Temps", async (db) => await ReadRowData(db, "LoginHistory", `DTSignin = '${DTSignin}'`));
const UpdateData = async (props: Props) => {
    const identifierKey = 'DTSignin';
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    await ConnectDB("Temps", async (db) => await UpdateRowData(db, "LoginHistory", keys, values, `${identifierKey} = '${props[identifierKey]}'`));
};
const DeleteData = async (DTSignin: string) => await ConnectDB("Temps", async (db) => await DeleteRowData(db, "LoginHistory", `DTSignin = '${DTSignin}'`));

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
    name: 'LoginHistory',
    modelColumn: modelColumn
};