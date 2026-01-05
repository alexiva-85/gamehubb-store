-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'FULFILLED', 'CANCELED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "ReferralRewardStatus" AS ENUM ('LOCKED', 'AVAILABLE', 'PAID', 'CANCELED');

-- CreateEnum
CREATE TYPE "ReferralRewardType" AS ENUM ('FIRST_ORDER', 'SUBSEQUENT_ORDER');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "discount_amount" INTEGER NOT NULL DEFAULT 0,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paid_at" TIMESTAMP(3),
    "fulfilled_at" TIMESTAMP(3),
    "refunded_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_events" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "inviter_id" TEXT NOT NULL,
    "referee_id" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "reward_type" "ReferralRewardType" NOT NULL,
    "status" "ReferralRewardStatus" NOT NULL DEFAULT 'LOCKED',
    "locked_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid_out_at" TIMESTAMP(3),
    "canceled_at" TIMESTAMP(3),

    CONSTRAINT "referral_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "orders_user_id_idx" ON "orders"("user_id");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_paid_at_idx" ON "orders"("paid_at");

-- CreateIndex
CREATE INDEX "referral_events_inviter_id_status_idx" ON "referral_events"("inviter_id", "status");

-- CreateIndex
CREATE INDEX "referral_events_locked_until_idx" ON "referral_events"("locked_until");

-- CreateIndex
CREATE UNIQUE INDEX "referral_events_order_id_inviter_id_reward_type_key" ON "referral_events"("order_id", "inviter_id", "reward_type");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_events" ADD CONSTRAINT "referral_events_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_events" ADD CONSTRAINT "referral_events_inviter_id_fkey" FOREIGN KEY ("inviter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_events" ADD CONSTRAINT "referral_events_referee_id_fkey" FOREIGN KEY ("referee_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

