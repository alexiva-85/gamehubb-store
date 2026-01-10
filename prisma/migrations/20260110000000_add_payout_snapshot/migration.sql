-- CreateEnum: PayoutAsset
CREATE TYPE "PayoutAsset" AS ENUM ('RUB', 'USDT', 'TON');

-- AlterTable: Add payout snapshot fields to withdrawal_requests
ALTER TABLE "withdrawal_requests" ADD COLUMN "payout_asset" "PayoutAsset";
ALTER TABLE "withdrawal_requests" ADD COLUMN "payout_amount" DECIMAL(65,30);
ALTER TABLE "withdrawal_requests" ADD COLUMN "payout_base_rub" DECIMAL(65,30);
ALTER TABLE "withdrawal_requests" ADD COLUMN "exchange_rate" DECIMAL(65,30);
ALTER TABLE "withdrawal_requests" ADD COLUMN "rate_source" TEXT;
ALTER TABLE "withdrawal_requests" ADD COLUMN "rate_captured_at" TIMESTAMP(3);
ALTER TABLE "withdrawal_requests" ADD COLUMN "payout_fee_rub" DECIMAL(65,30);
ALTER TABLE "withdrawal_requests" ADD COLUMN "payout_notes" TEXT;
ALTER TABLE "withdrawal_requests" ADD COLUMN "payout_snapshot" JSONB;
