/*
  Warnings:

  - Added the required column `country` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "release" TEXT NOT NULL;
