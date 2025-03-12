/*
  Warnings:

  - Added the required column `bodyType` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelType` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "bodyType" "BodyType" NOT NULL,
ADD COLUMN     "fuelType" "FuelType" NOT NULL;
