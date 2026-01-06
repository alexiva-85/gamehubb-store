-- AlterTable: add withdrawal_request_id to referral_events
ALTER TABLE "referral_events" ADD COLUMN "withdrawal_request_id" TEXT;

-- CreateIndex
CREATE INDEX "referral_events_withdrawal_request_id_idx" ON "referral_events"("withdrawal_request_id");

-- CreateIndex
CREATE INDEX "referral_events_inviter_id_status_withdrawal_request_id_idx" ON "referral_events"("inviter_id", "status", "withdrawal_request_id");

-- AlterTable: add paid_at to withdrawal_requests
ALTER TABLE "withdrawal_requests" ADD COLUMN "paid_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "referral_events" ADD CONSTRAINT "referral_events_withdrawal_request_id_fkey" FOREIGN KEY ("withdrawal_request_id") REFERENCES "withdrawal_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

