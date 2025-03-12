-- DropIndex
DROP INDEX "Cart_title_key";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "title" DROP NOT NULL;
