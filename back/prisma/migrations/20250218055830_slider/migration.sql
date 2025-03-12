/*
  Warnings:

  - You are about to drop the column `text` on the `Slider` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Slider` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Slider_title_key";

-- AlterTable
ALTER TABLE "Slider" DROP COLUMN "text",
DROP COLUMN "title";
