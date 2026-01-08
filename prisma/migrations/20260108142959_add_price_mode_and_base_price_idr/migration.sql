-- CreateEnum: PriceMode
CREATE TYPE "PriceMode" AS ENUM ('AUTO', 'MANUAL');

-- AlterTable: Add basePriceIdr and priceMode to products
ALTER TABLE "products" ADD COLUMN "base_price_idr" INTEGER;
ALTER TABLE "products" ADD COLUMN "price_mode" "PriceMode" NOT NULL DEFAULT 'AUTO';
