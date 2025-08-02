-- CreateTable
CREATE TABLE "public"."trainig_Attendance" (
    "id" SERIAL NOT NULL,
    "trainig_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trainig_Attendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."trainig_Attendance" ADD CONSTRAINT "trainig_Attendance_trainig_id_fkey" FOREIGN KEY ("trainig_id") REFERENCES "public"."trainigs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trainig_Attendance" ADD CONSTRAINT "trainig_Attendance_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
