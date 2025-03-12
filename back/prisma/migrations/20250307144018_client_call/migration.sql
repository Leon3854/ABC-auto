-- CreateTable
CREATE TABLE "ClientCall" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientPhone" TEXT,
    "clientEmail" TEXT,

    CONSTRAINT "ClientCall_pkey" PRIMARY KEY ("id")
);
