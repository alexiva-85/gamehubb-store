-- AlterTable: add paid_at to withdrawal_requests
ALTER TABLE "withdrawal_requests" ADD COLUMN IF NOT EXISTS "paid_at" TIMESTAMP(3);

