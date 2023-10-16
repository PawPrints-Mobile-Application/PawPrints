import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";


// ============================== DATABASE CONNECTION =============================
const ConnectDB = async (
  name: string
) => {
  const sqlite = new SQLiteConnection(CapacitorSQLite);
  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection(name, false)).result;
  let db: SQLiteDBConnection | null = null;
  if (ret.result && isConn) {
    db = await sqlite.retrieveConnection(name, false);
  } else {
    db = await sqlite.createConnection(
      name,
      false,
      "no-encryption",
      1,
      false
    );
  }
  return {sqlite, db};
};

const DisconnectDB = async (sqlite: SQLiteConnection, name: string) => await sqlite.closeConnection(name, false);

// ============================== TABLE MANIPULATION =============================
// ============================== CREATE ==============================
const CreateTable = async (
  db: SQLiteDBConnection,
  tableName: string,
  columns: string
) => {
  await db.open();
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
  const res = await db.execute(query);
  await db.close();
  console.log(`res: ${JSON.stringify(res)}`);
  if (res.changes && res.changes.changes && res.changes.changes < 0) {
    throw new Error(`Error: execute failed`);
  }
};
const DeleteTable = async (
  db: SQLiteDBConnection,
  tableName: string
) => {
  await db.open();
  const query = `DROP TABLE IF EXISTS ${tableName};`;
  const res = await db.execute(query);
  await db.close();
  console.log(`res: ${JSON.stringify(res)}`);
  if (res.changes && res.changes.changes && res.changes.changes < 0) {
    throw new Error(`Error: execute failed`);
  }
};

// ============================== ROW DATA MANIPULATION =============================
// ============================== INSERT ==============================
const InsertRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  columnNames: string,
  values: string
) => {
  await db.open();
  const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${values});`;
  const res = await db.execute(query);
  await db.close();
};

// ============================== READ ==============================
const ReadRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  identifier: string
) => {
  await db.open();
  const query = `SELECT * FROM ${tableName} WHERE ${identifier};`;
  const res = await db.query(query);
  await db.close();
  return res;
};

// ============================== UPDATE ==============================
const UpdateRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  data: string,
  identifier: string
) => {
  await db.open();
  const query = `UPDATE ${tableName} SET ${data} WHERE ${identifier};`;
  const res = await db.query(query);
  await db.close();
  return res;
};

// ============================== DELETE ==============================
const DeleteRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  identifier: string
) => {
  await db.open();
  const query = `DELETE FROM ${tableName} WHERE ${identifier};`;
  const res = await db.query(query);
  await db.close();
};

export {
  ConnectDB,
  DisconnectDB,
  CreateTable,

  // ROW DATA MANIPULATION
  InsertRowData,
  ReadRowData,
  UpdateRowData,
  DeleteRowData,
};
