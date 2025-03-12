-- CreateTable
CREATE TABLE "Parameter" (
    "id" SERIAL NOT NULL,
    "release" INTEGER,
    "country" TEXT,

    CONSTRAINT "Parameter_pkey" PRIMARY KEY ("id")
);
