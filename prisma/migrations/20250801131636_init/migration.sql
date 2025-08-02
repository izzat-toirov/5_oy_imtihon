-- CreateTable
CREATE TABLE "public"."matches" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "opponent" VARCHAR(50) NOT NULL,
    "match_Date" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "result" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
