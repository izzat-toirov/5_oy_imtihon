-- CreateTable
CREATE TABLE "public"."trainigs" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "topic" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trainigs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."trainigs" ADD CONSTRAINT "trainigs_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
