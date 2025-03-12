/*
  Warnings:

  - You are about to drop the `Parameter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bigPoster` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "bigPoster" TEXT NOT NULL,
ADD COLUMN     "poster" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Parameter";
