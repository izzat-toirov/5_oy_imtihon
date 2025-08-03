-- CreateTable
CREATE TABLE "public"."injuries" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "injury_date" TIMESTAMP(3) NOT NULL,
    "recovery_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "injuries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."injuries" ADD CONSTRAINT "injuries_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
