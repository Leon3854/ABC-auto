-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "benefit" TEXT NOT NULL,
    "benefitPrice" TEXT NOT NULL,
    "present" TEXT NOT NULL,
    "startPrice" TEXT NOT NULL,
    "startCredit" TEXT NOT NULL,
    "motorPower" TEXT NOT NULL,
    "gasoline" TEXT NOT NULL,
    "speed" TEXT NOT NULL,
    "acceleration" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);
