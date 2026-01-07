-- CreateEnum
CREATE TYPE "DigiflazzTransactionStatus" AS ENUM ('CREATED', 'SENT', 'SUCCESS', 'FAILED', 'PENDING');

-- CreateTable
CREATE TABLE "digiflazz_transactions" (
    "id" TEXT NOT NULL,
    "ref_id" TEXT NOT NULL,
    "buyer_sku_code" TEXT NOT NULL,
    "customer_no" TEXT NOT NULL,
    "amount" INTEGER,
    "status" "DigiflazzTransactionStatus" NOT NULL DEFAULT 'CREATED',
    "digiflazz_response" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "digiflazz_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "digiflazz_transactions_ref_id_key" ON "digiflazz_transactions"("ref_id");

-- CreateIndex
CREATE INDEX "digiflazz_transactions_ref_id_idx" ON "digiflazz_transactions"("ref_id");

-- CreateIndex
CREATE INDEX "digiflazz_transactions_status_idx" ON "digiflazz_transactions"("status");

