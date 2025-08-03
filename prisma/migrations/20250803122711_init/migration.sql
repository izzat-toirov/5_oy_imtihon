-- CreateTable
CREATE TABLE "public"."player_Photo" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "photo_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_Photo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."player_Photo" ADD CONSTRAINT "player_Photo_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
