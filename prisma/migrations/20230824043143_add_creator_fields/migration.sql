/*
  Warnings:

  - Added the required column `email` to the `Creator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Creator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Creator` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Creator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "preferredName" TEXT,
    "avatar" BLOB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Creator" ("id") SELECT "id" FROM "Creator";
DROP TABLE "Creator";
ALTER TABLE "new_Creator" RENAME TO "Creator";
CREATE UNIQUE INDEX "Creator_username_key" ON "Creator"("username");
CREATE UNIQUE INDEX "Creator_email_key" ON "Creator"("email");
CREATE UNIQUE INDEX "Creator_phone_key" ON "Creator"("phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
