/*
  Warnings:

  - You are about to drop the `Slider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Slider";

-- CreateTable
CREATE TABLE "Carousel" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "url" TEXT,
    "text" TEXT,

    CONSTRAINT "Carousel_pkey" PRIMARY KEY ("id")
);
