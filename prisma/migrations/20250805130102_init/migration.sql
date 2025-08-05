/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `coaches` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "coaches_user_id_key" ON "public"."coaches"("user_id");
