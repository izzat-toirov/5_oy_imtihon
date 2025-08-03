-- CreateTable
CREATE TABLE "public"."payments" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "amout" DECIMAL(65,30) NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "method" VARCHAR(50) NOT NULL,
    "prelod" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "reference" VARCHAR(255) NOT NULL,
    "notes" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
