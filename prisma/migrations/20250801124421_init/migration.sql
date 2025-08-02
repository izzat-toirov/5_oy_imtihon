-- CreateTable
CREATE TABLE "public"."coaches" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "license_no" VARCHAR(50) NOT NULL,
    "experiense" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coaches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."coaches" ADD CONSTRAINT "coaches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
