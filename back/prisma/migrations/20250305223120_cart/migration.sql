/*
  Warnings:

  - You are about to drop the column `file` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "file",
ADD COLUMN     "image" TEXT;
