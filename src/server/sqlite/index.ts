import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

// ============================== DATABASE CONNECTION =============================
const ConnectDB = async (
  name: string,
  callback: (db: SQLiteDBConnection) => Promise<any>
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
  let res;
  if (!!db) {res = await callback(db);}
  await db.open();
  console.log(await db.getTableList());
  await db.close();
  return res;
};

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
  console.log(`${tableName} res: ${JSON.stringify(res)}`);
  if (res.changes && res.changes.changes && res.changes.changes < 0) {
    throw new Error(`Error: execute failed`);
  }
};
const DeleteTable = async (
  db: SQLiteDBConnection,
  tableName: string
) => {
  await db.open();
  const res = await db.execute(`DROP TABLE IF EXISTS ${tableName};`);
  await db.close();
  console.log(`${tableName} res: ${JSON.stringify(res)}`);
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
  values: Array<string> | Array<number>
) => {
  await db.open();
  const length = values.length;
  const query = `INSERT INTO ${tableName} (${columnNames}) VALUES (${'?,'.repeat(length - 1)}?);`;
  await db.query(query, values);
  await db.close();
};

// ============================== READ ==============================
const ReadRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  identifier: string | undefined = undefined
) => {
  await db.open();
  const query = `SELECT * FROM ${tableName} ${!!identifier ? `WHERE ${identifier}` : ''};`;
  const res = await db.query(query);
  await db.close();
  return res;
};

// ============================== UPDATE ==============================
const UpdateRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  columnNames: Array<string>,
  values: Array<string> | Array<number>,
  identifier: string
) => {
  await db.open();
  const set = columnNames.join(' = ?, ')
  const query = `UPDATE ${tableName} SET ${set} WHERE ${identifier};`;
  const res = await db.query(query, values);
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
  await db.query(query);
  await db.close();
};

export {
  ConnectDB,
  CreateTable,
  DeleteTable,

  // ROW DATA MANIPULATION
  InsertRowData,
  ReadRowData,
  UpdateRowData,
  DeleteRowData,
};
