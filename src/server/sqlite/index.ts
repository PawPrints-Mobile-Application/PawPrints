import {
  CapacitorSQLite,
  SQLiteConnection,
} from "@capacitor-community/sqlite";

// ============================== DATABASE CONNECTION =============================
const ConnectDB = async (
  dbName: string,
  query: string,
  values: Array<any> | false = false
) => {
  const sqlite = new SQLiteConnection(CapacitorSQLite);
  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection(dbName, false)).result;
  const db =
    ret.result && isConn
      ? await sqlite.retrieveConnection(dbName, false)
      : await sqlite.createConnection(dbName, false, "no-encryption", 1, false);
  await db.open();
  let response;
  if (!!values) {
    response = await db.query(query, values);
  } else {
    response = await db.query(query);
  }
  const log = false;
  if (sessionStorage.getItem('dev-mode') === 'debug' || log) {
    if(!!response.values) {console.log('Query Processing: ' + response);}
    console.log(await db.getTableList());
  }
  await db.close();
  return response;
};

// ============================== TABLE MANIPULATION =============================
// ============================== CREATE ==============================
const CreateTable = async (
  dbName: string,
  tableName: string,
  columns: string
) => ConnectDB(dbName, `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`);

const DeleteTable = async (dbName: string, tableName: string) =>
  ConnectDB(dbName, `DROP TABLE IF EXISTS ${tableName};`);

// ============================== ROW DATA MANIPULATION =============================
// ============================== INSERT ==============================
const InsertRowData = async (
  dbName: string,
  tableName: string,
  data: {
    keys: Array<string>;
    values: Array<any>;
  }
) =>
  ConnectDB(
    dbName,
    `INSERT INTO ${tableName} (${data.keys.join(", ")}) VALUES (${"?,".repeat(
      data.values.length - 1
    )}?);`,
    data.values
  );

// ============================== READ ==============================
const ReadRowData = async (
  dbName: string,
  tableName: string,
  identifier:
    | {
        key: string;
        value: string | number;
      }
    | undefined = undefined
) =>
  ConnectDB(
    dbName,
    !!identifier
      ? `SELECT * FROM ${tableName} ${
          !!identifier ? `WHERE ${identifier?.key} = ?` : ""
        };`
      : `SELECT * FROM ${tableName};`,
    !!identifier && [identifier?.value]
  );

// ============================== UPDATE ==============================
const UpdateRowData = async (
  dbName: string,
  tableName: string,
  data: {
    keys: Array<string>;
    values: Array<any>;
  },
  identifier: {
    key: string;
    value: any;
  }
) =>
  ConnectDB(
    dbName,
    `UPDATE ${tableName} SET ${data.keys.join(" = ?, ")} = ? WHERE ${identifier.key} = ?;`,
    [...data.values, identifier.value]
  );

// ============================== DELETE ==============================
const DeleteRowData = async (
  dbName: string,
  tableName: string,
  identifier:
    | {
        key: string;
        value: string | number;
      }
    | undefined = undefined
) =>
  ConnectDB(
    dbName,
    !!identifier
      ? `DELETE FROM ${tableName} ${
          !!identifier ? `WHERE ${identifier?.key} = ?` : ""
        };`
      : `DELETE FROM ${tableName};`,
    !!identifier && [identifier?.value]
  );

export {
  CreateTable,
  DeleteTable,

  // ROW DATA MANIPULATION
  InsertRowData,
  ReadRowData,
  UpdateRowData,
  DeleteRowData,
};
