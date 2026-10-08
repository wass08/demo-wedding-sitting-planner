import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

// Creates the tables in db/schema.sql. Safe to run repeatedly.
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set. Run `vercel env pull .env.local` first.");
const sql = neon(url);
const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
for (const statement of schema.split(";").map((s) => s.trim()).filter(Boolean)) {
  await sql.query(statement);
}
console.log("Database schema is ready.");
