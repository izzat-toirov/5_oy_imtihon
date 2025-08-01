/*
  Warnings:

  - You are about to alter the column `activation_link` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "activation_link" SET DATA TYPE VARCHAR(255);
