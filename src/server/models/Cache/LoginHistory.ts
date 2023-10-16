import { ConnectDB, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../../sqlite";

interface Props {
    DSignin: Date,
    DSignout: Date,
    uid: string,
    TlastInit: string,
    TlastActive: string
};

const modelColumn = `
TlastInit TEXT PRIMARY KEY NOT NULL,
DSignin TEXT,
DSignout TEXT,
uid TEXT,
TlastActive TEXT
`;

const ConvertToMap = (props: Props) => {
    const temp = new Map();
    temp.set(props.TlastInit.toString(), props.TlastInit);
    temp.set(props.DSignin.toString(), props.DSignin);
    temp.set(props.DSignout.toString(), props.DSignout);
    temp.set(props.uid.toString(), props.uid);
    temp.set(props.TlastActive.toString(), props.TlastActive);
    return temp;
}

const InsertData = (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys()).join(', ');
    const values = Array.from(map.values()).join(', ');
    ConnectDB("Cache", (db) => InsertRowData(db, "LoginHistory", keys, values));
};
const ReadData = (deviceID: string) => ConnectDB("Cache", (db) => ReadRowData(db, "LoginHistory", `TlastInit = '${deviceID}'`));
const UpdateData = (deviceID: string, props: Props) => {
    const identifierKey = 'TlastInit';
    let data = '';
    const map = ConvertToMap(props);
    map.forEach((key, value) => {
        if (identifierKey === key) return;
        data = `${key} = '${value}, '` + data;
    });
    ConnectDB("Cache", (db) => UpdateRowData(db, "LoginHistory", data, `${identifierKey} = '${deviceID}'`));
};
const DeleteData = (deviceID: string) =>  ConnectDB("Cache", (db) => ReadRowData(db, "LoginHistory", `TlastInit = '${deviceID}'`));

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