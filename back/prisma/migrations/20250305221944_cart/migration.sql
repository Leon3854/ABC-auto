/*
  Warnings:

  - You are about to drop the column `image` on the `Cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "image",
ADD COLUMN     "file" TEXT,
ALTER COLUMN "offer" DROP NOT NULL,
ALTER COLUMN "benefit" DROP NOT NULL,
ALTER COLUMN "benefitPrice" DROP NOT NULL,
ALTER COLUMN "present" DROP NOT NULL,
ALTER COLUMN "startPrice" DROP NOT NULL,
ALTER COLUMN "startCredit" DROP NOT NULL,
ALTER COLUMN "motorPower" DROP NOT NULL,
ALTER COLUMN "gasoline" DROP NOT NULL,
ALTER COLUMN "speed" DROP NOT NULL,
ALTER COLUMN "acceleration" DROP NOT NULL,
ALTER COLUMN "buy" DROP NOT NULL,
ALTER COLUMN "details" DROP NOT NULL,
ALTER COLUMN "reserve" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_title_key" ON "Cart"("title");
