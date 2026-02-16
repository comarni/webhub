const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let connection;

async function initializeDatabase() {
  const dbPath = process.env.DB_PATH
    ? path.resolve(process.cwd(), process.env.DB_PATH)
    : path.resolve(__dirname, "../../database/webhub.db");

  connection = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await connection.exec("PRAGMA foreign_keys = ON;");

  const schemaPath = path.resolve(__dirname, "../../database/schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  await connection.exec(schemaSql);

  return connection;
}

function getDb() {
  if (!connection) {
    throw new Error("Base de datos no inicializada. Ejecuta initializeDatabase().");
  }
  return connection;
}

module.exports = { initializeDatabase, getDb };
