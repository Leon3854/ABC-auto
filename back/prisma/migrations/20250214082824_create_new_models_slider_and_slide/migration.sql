-- CreateTable
CREATE TABLE "Slider" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slide" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sliderId" INTEGER NOT NULL,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_sliderId_fkey" FOREIGN KEY ("sliderId") REFERENCES "Slider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
