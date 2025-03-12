/*
  Warnings:

  - Added the required column `buy` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `details` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reserve` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "buy" TEXT NOT NULL,
ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "reserve" TEXT NOT NULL;
