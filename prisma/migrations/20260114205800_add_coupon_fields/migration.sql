-- CreateEnum
CREATE TYPE "CouponCategory" AS ENUM ('PROMO', 'PARTNER', 'LOYALTY', 'SEASONAL', 'REFERRAL', 'OTHER');

-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "appliesTo" TEXT,
ADD COLUMN     "assignedTo" TEXT,
ADD COLUMN     "category" "CouponCategory" NOT NULL DEFAULT 'OTHER',
ADD COLUMN     "firstTimeOnly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxDiscount" DOUBLE PRECISION,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stackGroup" TEXT,
ADD COLUMN     "stackable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startsAt" TIMESTAMP(3),
ADD COLUMN     "totalSavings" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "coupons_category_idx" ON "coupons"("category");

-- CreateIndex
CREATE INDEX "coupons_expiresAt_idx" ON "coupons"("expiresAt");
