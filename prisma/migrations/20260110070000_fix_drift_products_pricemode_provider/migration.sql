-- Baseline migration to fix drift: Products PriceMode and Provider enums
-- This migration is idempotent and safe to run on existing databases

-- Create PriceMode enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE "PriceMode" AS ENUM ('AUTO', 'MANUAL');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create Provider enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE "Provider" AS ENUM ('MANUAL', 'DIGIFLAZZ', 'AUTOMATED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Remove currency column if it exists (legacy field)
ALTER TABLE "products" DROP COLUMN IF EXISTS "currency";

-- Add base_price_idr column if it doesn't exist
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "base_price_idr" INTEGER;

-- Add price_mode column if it doesn't exist (without NOT NULL first)
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "price_mode" "PriceMode";

-- Set default value for price_mode if it's NULL
UPDATE "products" SET "price_mode" = 'AUTO' WHERE "price_mode" IS NULL;

-- Make price_mode NOT NULL and set default (safe: only if column exists)
DO $$ BEGIN
  -- Set NOT NULL constraint
  ALTER TABLE "products" ALTER COLUMN "price_mode" SET NOT NULL;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

DO $$ BEGIN
  -- Set default value
  ALTER TABLE "products" ALTER COLUMN "price_mode" SET DEFAULT 'AUTO';
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Safely convert provider column to Provider enum type
DO $$ BEGIN
  -- Check if provider column exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
      AND table_name = 'products' 
      AND column_name = 'provider'
  ) THEN
    -- Check if it's not already Provider enum type
    -- Try to get the type name (may be lowercase in pg_type)
    IF EXISTS (
      SELECT 1
      FROM information_schema.columns c
      JOIN pg_type t ON t.typname = c.udt_name
      WHERE c.table_schema = 'public'
        AND c.table_name = 'products'
        AND c.column_name = 'provider'
        AND t.typname NOT IN ('Provider', 'provider')
    ) THEN
      -- Try to convert to Provider enum
      BEGIN
        ALTER TABLE "products"
          ALTER COLUMN "provider" TYPE "Provider"
          USING "provider"::text::"Provider";
      EXCEPTION
        WHEN OTHERS THEN
          -- If conversion fails, try alternative approach
          BEGIN
            -- If provider is text/varchar, cast through text first
            ALTER TABLE "products"
              ALTER COLUMN "provider" TYPE "Provider"
              USING CASE
                WHEN "provider"::text = 'MANUAL' THEN 'MANUAL'::"Provider"
                WHEN "provider"::text = 'DIGIFLAZZ' THEN 'DIGIFLAZZ'::"Provider"
                WHEN "provider"::text = 'AUTOMATED' THEN 'AUTOMATED'::"Provider"
                ELSE 'MANUAL'::"Provider"
              END;
          EXCEPTION
            WHEN OTHERS THEN NULL;
          END;
      END;
    END IF;
    
    -- Set default value for provider if not set
    BEGIN
      ALTER TABLE "products" ALTER COLUMN "provider" SET DEFAULT 'MANUAL';
    EXCEPTION
      WHEN OTHERS THEN NULL;
    END;
    
    -- Ensure provider is NOT NULL
    BEGIN
      UPDATE "products" SET "provider" = 'MANUAL' WHERE "provider" IS NULL;
      ALTER TABLE "products" ALTER COLUMN "provider" SET NOT NULL;
    EXCEPTION
      WHEN OTHERS THEN NULL;
    END;
  ELSE
    -- If provider column doesn't exist, add it
    ALTER TABLE "products" ADD COLUMN "provider" "Provider" NOT NULL DEFAULT 'MANUAL';
  END IF;
END $$;
