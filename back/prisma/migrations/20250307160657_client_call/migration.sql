/*
  Warnings:

  - A unique constraint covering the columns `[clientPhone]` on the table `ClientCall` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientEmail]` on the table `ClientCall` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClientCall_clientPhone_key" ON "ClientCall"("clientPhone");

-- CreateIndex
CREATE UNIQUE INDEX "ClientCall_clientEmail_key" ON "ClientCall"("clientEmail");
