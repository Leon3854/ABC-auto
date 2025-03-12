/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Slide` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Slide_title_key" ON "Slide"("title");
