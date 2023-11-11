import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";

const databaseName = {
  dev: "Dev",
  prod: "User",
};

// ============================== DATABASE CONNECTION =============================
const ConnectDB = async (
  query: string,
  values: Array<any> | false = false,
  queryLog: boolean = false
) => {
  const dbName = databaseName.dev;
  const sqlite = new SQLiteConnection(CapacitorSQLite);
  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection(dbName, false)).result;
  const db =
    ret.result && isConn
      ? await sqlite.retrieveConnection(dbName, false)
      : await sqlite.createConnection(dbName, false, "no-encryption", 1, false);
  const log = false || queryLog;
  if (log) console.log("Query Processing: " + query, "Values: " + values);

  await db.open();
  let response;
  if (!!values) {
    response = await db.query(query, values);
  } else {
    response = await db.query(query);
  }

  if (log) console.log("Response: " + response);

  await db.close();
  return response;
};

// ============================== TABLE MANIPULATION =============================
// ============================== CREATE ==============================
const CreateTable = async (tableName: string, columns: string) =>
  ConnectDB(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`);

const DeleteTable = async (tableName: string) =>
  ConnectDB(`DROP TABLE IF EXISTS ${tableName};`);

// ============================== ROW DATA MANIPULATION =============================
// ============================== INSERT ==============================
const InsertRowData = async (
  tableName: string,
  data: {
    keys: Array<string>;
    values: Array<any>;
  },
  allowReplace: boolean = false
) =>
  ConnectDB(
    `INSERT ${allowReplace ? 'OR REPLACE ' : '' }INTO ${tableName} (${data.keys.join(", ")}) VALUES (${"?,".repeat(
      data.values.length - 1
    )}?);`,
    data.values, true
  );

// ============================== READ ==============================
const ReadRowData = async (
  tableName: string,
  identifier:
    | {
        key: string;
        value: string | number;
      }
    | undefined = undefined
) =>
  ConnectDB(
    !!identifier
      ? `SELECT * FROM ${tableName} ${
          !!identifier ? `WHERE ${identifier?.key} = ?` : ""
        };`
      : `SELECT * FROM ${tableName};`,
    !!identifier && [identifier?.value]
  );
const ReadFirstRow = async (tableName: string) =>
  ConnectDB(`SELECT * FROM ${tableName} LIMIT 1;`);
const ReadLatestRow = async (tableName: string) =>
  ConnectDB(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1;`);

// ============================== UPDATE ==============================
const UpdateRowData = async (
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
    `UPDATE ${tableName} SET ${data.keys.join(" = ?, ")} = ? WHERE ${
      identifier.key
    } = ?;`,
    [...data.values, identifier.value]
  );
const UpdateFirstRowData = async (
  tableName: string,
  data: {
    keys: Array<string>;
    values: Array<any>;
  }
) =>
  ConnectDB(
    `UPDATE ${tableName} SET ${data.keys.join(
      " = ?, "
    )} = ? WHERE id = (SELECT id FROM ${tableName} LIMIT 1);`,
    data.values
  );
const UpdateLatestRowData = async (
  tableName: string,
  data: {
    keys: Array<string>;
    values: Array<any>;
  }
) =>
  ConnectDB(
    `UPDATE ${tableName} SET ${data.keys.join(
      " = ?, "
    )} = ? WHERE id = (SELECT id FROM ${tableName} ORDER BY id DESC LIMIT 1);`,
    data.values
  );

// ============================== DELETE ==============================
const DeleteRowData = async (
  tableName: string,
  identifier:
    | {
        key: string;
        value: string | number;
      }
    | undefined = undefined
) =>
  ConnectDB(
    !!identifier
      ? `DELETE FROM ${tableName} ${
          !!identifier ? `WHERE ${identifier?.key} = ?` : ""
        };`
      : `DELETE FROM ${tableName};`,
    !!identifier && [identifier?.value]
  );

// ============================== RESET ==============================
const ResetTable = async (tableName: string) => await DeleteRowData(tableName);
const ResetDatabase = async () => {
  const dbName = databaseName.dev;
  const sqlite = new SQLiteConnection(CapacitorSQLite);
  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection(dbName, false)).result;
  const db =
    ret.result && isConn
      ? await sqlite.retrieveConnection(dbName, false)
      : await sqlite.createConnection(dbName, false, "no-encryption", 1, false);
  await db.open();
  db.getTableList().then((tables) =>
    tables.values?.forEach((table) => db.query(`DELETE FROM ${table};`))
  );
  await db.close();
};

export {
  CreateTable,
  DeleteTable,

  ResetDatabase,
  ResetTable,

  // ROW DATA MANIPULATION
  InsertRowData,
  ReadRowData,
  ReadFirstRow,
  ReadLatestRow,
  UpdateRowData,
  UpdateFirstRowData,
  UpdateLatestRowData,
  DeleteRowData,
};
