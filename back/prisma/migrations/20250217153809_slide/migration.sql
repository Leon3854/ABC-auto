/*
  Warnings:

  - You are about to drop the column `image` on the `Slide` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slide" DROP COLUMN "image",
ADD COLUMN     "filePath" TEXT;
