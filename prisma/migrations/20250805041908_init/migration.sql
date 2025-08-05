-- CreateTable
CREATE TABLE "public"."age_group_fess" (
    "id" SERIAL NOT NULL,
    "age_group" VARCHAR(10) NOT NULL,
    "min_age" INTEGER NOT NULL,
    "max_age" INTEGER NOT NULL,
    "monthly_fee" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "age_group_fess_pkey" PRIMARY KEY ("id")
);
