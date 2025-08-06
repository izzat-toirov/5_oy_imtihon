/*
  Warnings:

  - You are about to drop the `AgeGroupFees` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."AgeGroupFees";

-- CreateTable
CREATE TABLE "public"."age_Group_Fess" (
    "id" SERIAL NOT NULL,
    "age_group" "public"."AgeGroup" NOT NULL,
    "min_age" INTEGER NOT NULL,
    "max_age" INTEGER NOT NULL,
    "monthly_fee" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "age_Group_Fess_pkey" PRIMARY KEY ("id")
);
