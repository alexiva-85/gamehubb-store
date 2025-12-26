-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tgUserId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "totalCents" INTEGER NOT NULL,
    "totalAmountKopeks" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'RUB',
    "provider" TEXT NOT NULL DEFAULT 'TBANK',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "providerPaymentId" TEXT,
    "providerPaymentUrl" TEXT,
    "paidAt" DATETIME,
    "fulfillmentStatus" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    "fulfillmentAttemptCount" INTEGER NOT NULL DEFAULT 0,
    "fulfillmentLastError" TEXT,
    "fulfillmentPayloadJson" TEXT
);
INSERT INTO "new_Order" ("createdAt", "currency", "id", "paidAt", "provider", "providerPaymentId", "providerPaymentUrl", "status", "tgUserId", "totalAmountKopeks", "totalCents", "updatedAt") SELECT "createdAt", "currency", "id", "paidAt", "provider", "providerPaymentId", "providerPaymentUrl", "status", "tgUserId", "totalAmountKopeks", "totalCents", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_providerPaymentId_key" ON "Order"("providerPaymentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
