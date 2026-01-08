-- AlterTable: Add Digiflazz fields to orders
ALTER TABLE "orders" ADD COLUMN "product_sku" TEXT;
ALTER TABLE "orders" ADD COLUMN "customer_no" TEXT;
ALTER TABLE "orders" ADD COLUMN "digiflazz_ref_id" TEXT;

-- CreateIndex: Unique index on digiflazz_ref_id
CREATE UNIQUE INDEX "orders_digiflazz_ref_id_key" ON "orders"("digiflazz_ref_id");

-- CreateIndex: Index on digiflazz_ref_id for lookups
CREATE INDEX "orders_digiflazz_ref_id_idx" ON "orders"("digiflazz_ref_id");

-- AlterTable: Add orderId to digiflazz_transactions
ALTER TABLE "digiflazz_transactions" ADD COLUMN "order_id" TEXT;

-- CreateIndex: Index on order_id for lookups
CREATE INDEX "digiflazz_transactions_order_id_idx" ON "digiflazz_transactions"("order_id");

-- AddForeignKey: Link digiflazz_transactions to orders
ALTER TABLE "digiflazz_transactions" ADD CONSTRAINT "digiflazz_transactions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

