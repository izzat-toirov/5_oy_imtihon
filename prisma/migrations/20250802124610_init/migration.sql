-- AddForeignKey
ALTER TABLE "public"."performance_Score" ADD CONSTRAINT "performance_Score_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."performance_Score" ADD CONSTRAINT "performance_Score_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "public"."coaches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
