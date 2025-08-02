/*
  Warnings:

  - You are about to drop the column `postion` on the `team_Players` table. All the data in the column will be lost.
  - Added the required column `position` to the `team_Players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."team_Players" DROP COLUMN "postion",
ADD COLUMN     "position" VARCHAR(30) NOT NULL;
