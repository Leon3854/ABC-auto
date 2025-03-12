-- CreateTable
CREATE TABLE "Slider" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);
