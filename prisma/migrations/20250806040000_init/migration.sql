/*
  Warnings:

  - You are about to drop the `age_Group_Fess` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."AgeGroup" AS ENUM ('KIDS', 'TEENS', 'ADULTS');

-- AlterTable
ALTER TABLE "public"."players" ADD COLUMN     "parentsId" INTEGER;

-- DropTable
DROP TABLE "public"."age_Group_Fess";

-- CreateTable
CREATE TABLE "public"."AgeGroupFees" (
    "id" SERIAL NOT NULL,
    "age_group" "public"."AgeGroup" NOT NULL,
    "min_age" INTEGER NOT NULL,
    "max_age" INTEGER NOT NULL,
    "monthly_fee" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "AgeGroupFees_pkey" PRIMARY KEY ("id")
);
