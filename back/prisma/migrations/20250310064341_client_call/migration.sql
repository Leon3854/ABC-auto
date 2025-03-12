/*
  Warnings:

  - You are about to drop the column `clientEmail` on the `ClientCall` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ClientCall_clientEmail_key";

-- AlterTable
ALTER TABLE "ClientCall" DROP COLUMN "clientEmail";
