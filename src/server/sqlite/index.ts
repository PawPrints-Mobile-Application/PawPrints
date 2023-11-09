import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";

const databaseName = {
  dev: "Dev",
  prod: "User",
};

// ============================== DATABASE CONNECTION =============================
const ConnectDB = async (
  query: string,
  values: Array<any> | false = false,
  consoleLog: boolean = false
) => {
  const dbName = databaseName.dev;
  const sqlite = new SQLiteConnection(CapacitorSQLite);
  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection(dbName, false)).result;
  const db =
    ret.result && isConn
      ? await sqlite.retrieveConnection(dbName, false)
      : await sqlite.createConnection(dbName, false, "no-encryption", 1, false);
  await db.open();
  let response;
  if (consoleLog) console.log(query);
  if (!!values) {
    response = await db.query(query, values);
  } else {
    response = await db.query(query);
  }
  const log = false;
  if (sessionStorage.getItem("dev-mode") === "debug" || log) {
    if (!!response.values) {
      console.log("Query Processing: " + response);
    }
    console.log(await db.getTableList());
  }
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
  }
) =>
  ConnectDB(
    `INSERT INTO ${tableName} (${data.keys.join(", ")}) VALUES (${"?,".repeat(
      data.values.length - 1
    )}?);`,
    data.values
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

export {
  CreateTable,
  DeleteTable,

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
