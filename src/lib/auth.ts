import { betterAuth } from "better-auth"
/// <reference types="node" />

import { DatabaseSync } from "node:sqlite"

export const auth = betterAuth({
  database: new DatabaseSync("./sqlite.db"),
})