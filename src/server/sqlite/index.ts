import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

// ============================== DATABASE CONNECTION =============================
const ConnectDB = async (
  callback: (db: SQLiteDBConnection) => Promise<any>
) => {
  const sqlite = new SQLiteConnection(CapacitorSQLite);
  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection("Guest", false)).result;
  const db =
    ret.result && isConn
      ? await sqlite.retrieveConnection("Guest", false)
      : await sqlite.createConnection(
          "Guest",
          false,
          "no-encryption",
          1,
          false
        );
  await db.open();
  const response = await callback(db);
  await db.close();
  return response;
};

// ============================== TABLE MANIPULATION =============================
// ============================== CREATE ==============================
const CreateTable = async (
  db: SQLiteDBConnection,
  tableName: string,
  columns: string
) => {
  console.log(`Table Initialized: ${tableName}`);
  return await db.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`);
}

const DeleteTable = async (db: SQLiteDBConnection, tableName: string) => {
  console.log(`Table Deleted: ${tableName}`);
  return await db.execute(`DROP TABLE IF EXISTS ${tableName};`);
}

// ============================== ROW DATA MANIPULATION =============================
// ============================== INSERT ==============================
const InsertRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  data: {
    keys: Array<string>,
    values: Array<any>
  }
) => 
  await db.query(
    `INSERT INTO ${tableName} (${data.keys.join(', ')}) VALUES (${"?,".repeat(
      data.values.length - 1
    )}?);`,
    data.values
  );

// ============================== READ ==============================
const ReadRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  identifier: {
    key: string,
    value: string | number
  } |undefined =undefined
) => !!identifier ? await db.query(
  `SELECT * FROM ${tableName} ${!!identifier ? `WHERE ${identifier?.key} = ?` : ""};`,[identifier?.value]) : await db.query(`SELECT * FROM ${tableName};`);

// ============================== UPDATE ==============================
const UpdateRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  data: {
    keys: Array<string>,
    values: Array<any>
  },
  identifier: {
    key: string,
    value: any
  }
) =>
  await db.query(
    `UPDATE ${tableName} SET ${data.keys.join(
      " = ?, "
    )} WHERE ${identifier.key} = ?;`,
    [...data.values, identifier.value]
  );

// ============================== DELETE ==============================
const DeleteRowData = async (
  db: SQLiteDBConnection,
  tableName: string,
  identifier: {
    key: string,
    value: string | number
  } |undefined =undefined
) => !!identifier ? await db.query(`DELETE FROM ${tableName} ${!!identifier ? `WHERE ${identifier?.key} = ?` : ""};`,[identifier?.value]) : await db.query(`DELETE FROM ${tableName};`);

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
