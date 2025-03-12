/*
  Warnings:

  - You are about to drop the column `bigPoster` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `release` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "bigPoster",
DROP COLUMN "country",
DROP COLUMN "poster",
DROP COLUMN "release";
