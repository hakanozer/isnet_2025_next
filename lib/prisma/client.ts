import Database from "better-sqlite3";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";

// DATABASE_URL = "file:./dev.db"
const dbPath = process.env.DATABASE_URL!.replace("file:", "");

const adapter = new PrismaBetterSqlite3({
  url: dbPath,
});

const prismaDB = new PrismaClient({ adapter });

export default prismaDB;
