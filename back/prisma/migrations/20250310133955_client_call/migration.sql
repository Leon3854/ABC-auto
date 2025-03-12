/*
  Warnings:

  - You are about to drop the column `clientName` on the `ClientCall` table. All the data in the column will be lost.
  - You are about to drop the column `clientPhone` on the `ClientCall` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[callPhone]` on the table `ClientCall` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `callName` to the `ClientCall` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ClientCall_clientPhone_key";

-- AlterTable
ALTER TABLE "ClientCall" DROP COLUMN "clientName",
DROP COLUMN "clientPhone",
ADD COLUMN     "callName" TEXT NOT NULL,
ADD COLUMN     "callPhone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ClientCall_callPhone_key" ON "ClientCall"("callPhone");
