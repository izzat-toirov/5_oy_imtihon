-- AlterTable
ALTER TABLE "public"."players" ADD COLUMN     "parent_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."players" ADD CONSTRAINT "players_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
