/*
  Warnings:

  - Added the required column `text` to the `Slider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slider" ADD COLUMN     "text" TEXT NOT NULL;
