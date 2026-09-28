 import  { DatabaseSync } from "node:sqlite"
const db = new DatabaseSync("./sqlite.db")

const tables = db
    .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name"
    )
    .all()

console.log(tables)