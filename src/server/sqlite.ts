import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

const databaseName = {
  dev: "Dev",
  prod: "User",
};

const Connect = async () => {
  const dbName = databaseName.dev;
  const sqlite = new SQLiteConnection(CapacitorSQLite);
  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection(dbName, false)).result;
  return ret.result && isConn
    ? sqlite.retrieveConnection(dbName, false)
    : sqlite.createConnection(dbName, false, "no-encryption", 1, false);
};
const Open = async (db: SQLiteDBConnection) => db.open();
const Close = async (db: SQLiteDBConnection) => db.close();

// ============================== TABLE MANIPULATION =============================
// ============================== CREATE ==============================
const CreateTable = async (
  db: SQLiteDBConnection,
  tableName: string,
  columns: string
) => await db.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`);

const DeleteTable = async (db: SQLiteDBConnection, tableName: string) =>
  await db.query(`DROP TABLE IF EXISTS ${tableName};`);

// ============================== ROW DATA MANIPULATION =============================
// ============================== INSERT ==============================
const InsertRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  data: {
    keys: Array<string>;
    values: Array<string | number>;
  },
  allowReplace: boolean = false
) =>
  await db.query(
    `INSERT ${
      allowReplace ? "OR REPLACE " : ""
    }INTO ${tableName} (${data.keys.join(", ")}) VALUES (${"?,".repeat(
      data.values.length - 1
    )}?);`,
    data.values
  );

// ============================== READ ==============================
const ReadAllData = async (db: SQLiteDBConnection, tableName: string) =>
  await db.query(`SELECT * FROM ${tableName}`);
const ReadRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  identifier: Map<string, string | number>
) => {
  let keys = new Array(...identifier.keys());
  let values = new Array(...identifier.values());

  return await db.query(
    `SELECT * FROM ${tableName} WHERE ${keys.map((key) => `${key} = ?`)};`,
    values
  );
};
const ReadFirstRow = async (db: SQLiteDBConnection, tableName: string) =>
  await db.query(`SELECT * FROM ${tableName} LIMIT 1;`);
const ReadLastRow = async (db: SQLiteDBConnection, tableName: string) =>
  await db.query(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1;`);

// ============================== READ ==============================
const UpdateAllData = async (
  db: SQLiteDBConnection,
  tableName: string,
  data: Map<string, string | number>
) => {
  let _data = {
    keys: new Array(...data.keys()),
    values: new Array(...data.values()),
  };

  return await db.query(
    `UPDATE ${tableName} SET ${_data.keys.map((key) => `${key} = ?`)};`,
    _data.values
  );
};
const UpdateRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  data: Map<string, string | number>,
  identifier: Map<string, string | number>
) => {
  let _identifier = {
    keys: new Array(...identifier.keys()),
    values: new Array(...identifier.values()),
  };
  let _data = {
    keys: new Array(...data.keys()),
    values: new Array(...data.values()),
  };

  return await db.query(
    `UPDATE ${tableName} SET ${_data.keys.map(
      (key) => `${key} = ?`
    )} WHERE ${_identifier.keys.map((key) => `${key} = ?`)};`,
    _data.values.concat(_identifier.values)
  );
};
const UpdateFirstRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  data: Map<string, string | number>
) => {
  let _data = {
    keys: new Array(...data.keys()),
    values: new Array(...data.values()),
  };
  return await db.query(
    `UPDATE ${tableName} SET ${_data.keys.join(
      " = ?, "
    )} = ? WHERE id = (SELECT id FROM ${tableName} LIMIT 1);`,
    _data.values
  );
};
const UpdateLastRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  data: Map<string, string | number>
) => {
  let _data = {
    keys: new Array(...data.keys()),
    values: new Array(...data.values()),
  };
  return await db.query(
    `UPDATE ${tableName} SET ${_data.keys.join(
      " = ?, "
    )} = ? WHERE id = (SELECT id FROM ${tableName} ORDER BY id DESC LIMIT 1);`,
    _data.values
  );
};

// ============================== DELETE ==============================
const DeleteAllData = async (db: SQLiteDBConnection, tableName: string) =>
  await db.query(`DELETE FROM ${tableName};`);
const DeleteRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  identifier: Map<string, string | number>
) => {
  let keys = new Array(...identifier.keys());
  let values = new Array(...identifier.values());
  return await db.query(
    `DELETE FROM ${tableName} WHERE ${keys.map((key) => `${key} = ?`)};`,
    values
  );
};

export {
  Connect,
  Open,
  Close,
  CreateTable,
  DeleteTable,
  InsertRowData,
  ReadAllData,
  ReadRowData,
  ReadFirstRow,
  ReadLastRow,
  UpdateAllData,
  UpdateRowData,
  UpdateFirstRowData,
  UpdateLastRowData,
  DeleteAllData,
  DeleteRowData,
};
