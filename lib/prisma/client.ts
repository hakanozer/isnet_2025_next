import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client/extension";

import "dotenv/config";

const adapter = new PrismaBetterSqlite3(process.env.DATABASE_URL!);

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
