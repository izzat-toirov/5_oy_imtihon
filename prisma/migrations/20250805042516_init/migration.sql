/*
  Warnings:

  - You are about to drop the `age_group_fess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."age_group_fess";

-- CreateTable
CREATE TABLE "public"."age_Group_Fess" (
    "id" SERIAL NOT NULL,
    "age_group" VARCHAR(10) NOT NULL,
    "min_age" INTEGER NOT NULL,
    "max_age" INTEGER NOT NULL,
    "monthly_fee" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "age_Group_Fess_pkey" PRIMARY KEY ("id")
);
