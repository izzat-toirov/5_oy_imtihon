-- CreateTable
CREATE TABLE "public"."player_Parents" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_Parents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."player_Parents" ADD CONSTRAINT "player_Parents_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."player_Parents" ADD CONSTRAINT "player_Parents_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
