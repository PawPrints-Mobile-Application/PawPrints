import { ConnectDB, DisconnectDB, InsertRowData, ReadRowData, UpdateRowData, DeleteRowData } from "../../sqlite";

type Subscription = 'Free'| 'Pawmium';
interface Props {
    uid: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    subscription: Subscription,
};

const modelColumn = `
uid TEXT PRIMARY KEY NOT NULL,
firstName TEXT,
lastName TEXT,
email TEXT,
password TEXT,
subscription TEXT
`;

const ConvertToMap = (props: Props) => {
    const temp = new Map();
    temp.set(props.uid.toString(), props.uid);
    temp.set(props.firstName.toString(), props.firstName);
    temp.set(props.lastName.toString(), props.lastName);
    temp.set(props.email.toString(), props.email);
    temp.set(props.password.toString(), props.password);
    temp.set(props.subscription.toString(), props.subscription);
    return temp;
};

const InsertData = async (props: Props) => {
    const map = ConvertToMap(props);
    const keys = Array.from(map.keys()).join(', ');
    const values = Array.from(map.values()).join(', ');
    const { sqlite, db } = await ConnectDB("User");
    InsertRowData(db, "UserProfile", keys, values);
    await DisconnectDB(sqlite, 'User');
};
const ReadData = async (userID: string) => {
    const { sqlite, db } = await ConnectDB("User");
    ReadRowData(db, "UserProfile", `uid = '${userID}'`);
    await DisconnectDB(sqlite, 'User');
};
const UpdateData = async (userID: string, props: Props) => {
    const identifierKey = 'uid';
    let data = '';
    const map = ConvertToMap(props);
    map.forEach((key, value) => {
        if (identifierKey === key) return;
        data = `${key} = '${value}, '` + data;
    });
    const { sqlite, db } = await ConnectDB("User");
    UpdateRowData(db, "UserProfile", data, `${identifierKey} = '${userID}'`);
    await DisconnectDB(sqlite, 'User');
};
const DeleteData = async (userID: string) => {
    const { sqlite, db } = await ConnectDB("User");
    DeleteRowData(db, "UserProfile", `uid = '${userID}'`);
    await DisconnectDB(sqlite, 'User');
};

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
    name: 'UserProfile',
    modelColumn: modelColumn
};