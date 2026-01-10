-- CreateEnum: PriceMode (idempotent)
DO $$ BEGIN
  CREATE TYPE "PriceMode" AS ENUM ('AUTO', 'MANUAL');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- AlterTable: Add basePriceIdr and priceMode to products (idempotent)
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "base_price_idr" INTEGER;

-- Add price_mode column without NOT NULL first (if it doesn't exist)
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "price_mode" "PriceMode";

-- Set default value for price_mode if it's NULL
UPDATE "products" SET "price_mode" = 'AUTO' WHERE "price_mode" IS NULL;

-- Make price_mode NOT NULL and set default (safe: only if column exists)
DO $$ BEGIN
  ALTER TABLE "products" ALTER COLUMN "price_mode" SET NOT NULL;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "products" ALTER COLUMN "price_mode" SET DEFAULT 'AUTO';
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;
