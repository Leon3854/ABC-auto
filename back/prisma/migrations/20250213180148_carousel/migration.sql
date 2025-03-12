/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Carousel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Carousel_title_key" ON "Carousel"("title");
