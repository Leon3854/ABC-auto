/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Slider` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Slider_title_key" ON "Slider"("title");
