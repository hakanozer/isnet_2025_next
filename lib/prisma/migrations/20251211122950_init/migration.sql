-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "role" TEXT DEFAULT 'PRODUCT',
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "status" BOOLEAN DEFAULT true
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "role", "status", "updateAt") SELECT "createdAt", "email", "id", "name", "password", "role", "status", "updateAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
