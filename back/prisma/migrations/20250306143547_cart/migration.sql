/*
  Warnings:

  - You are about to drop the column `title` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `nameModel` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "title",
ADD COLUMN     "nameModel" TEXT NOT NULL;
