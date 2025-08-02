-- CreateTable
CREATE TABLE "public"."performance_Score" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "coach_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "discipline" INTEGER NOT NULL,
    "physical" INTEGER NOT NULL,
    "technique" INTEGER NOT NULL,
    "notes" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "performance_Score_pkey" PRIMARY KEY ("id")
);
