import { ConnectDB, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../../sqlite";

type AccountType = 'Guest' | 'Firebase';
interface Props {
    uid: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    accountType: AccountType,
    DTCreated: Date
};

const modelColumn = `
uid TEXT PRIMARY KEY NOT NULL,
firstName TEXT,
lastName TEXT,
email TEXT,
password TEXT,
accountType TEXT,
DTCreated TEXT
`;

const ConvertToMap = (props: Props) => {
    const temp = new Map();
    temp.set(props.uid.toString(), props.uid);
    temp.set(props.firstName.toString(), props.firstName);
    temp.set(props.lastName.toString(), props.lastName);
    temp.set(props.email.toString(), props.email);
    temp.set(props.password.toString(), props.password);
    temp.set(props.accountType.toString(), props.accountType);
    temp.set(props.DTCreated.toString(), props.DTCreated);
    return temp;
}

const InsertData = (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys()).join(', ');
    const values = Array.from(map.values()).join(', ');
    ConnectDB("Cache", (db) => InsertRowData(db, "Accounts", keys, values));
};
const ReadData = (deviceID: string) => ConnectDB("Cache", (db) => ReadRowData(db, "Accounts", `uid = '${deviceID}'`));
const UpdateData = (deviceID: string, props: Props) => {
    const identifierKey = 'uid';
    let data = '';
    const map = ConvertToMap(props);
    map.forEach((key, value) => {
        if (identifierKey === key) return;
        data = `${key} = '${value}, '` + data;
    });
    ConnectDB("Cache", (db) => UpdateRowData(db, "Accounts", data, `${identifierKey} = '${deviceID}'`));
};
const DeleteData = (deviceID: string) =>  ConnectDB("Cache", (db) => ReadRowData(db, "Accounts", `uid = '${deviceID}'`));

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
    name: 'Accounts',
    modelColumn: modelColumn
};