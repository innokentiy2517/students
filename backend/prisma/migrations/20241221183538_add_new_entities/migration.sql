/*
  Warnings:

  - You are about to drop the column `attestation_type` on the `Disciplines` table. All the data in the column will be lost.
  - You are about to drop the column `number_of_hours` on the `Disciplines` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Disciplines" DROP COLUMN "attestation_type",
DROP COLUMN "number_of_hours";

-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "speciality_id" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Specialities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specialities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Learning_plan_content" (
    "id" SERIAL NOT NULL,
    "discipline_id" INTEGER NOT NULL,
    "learning_plan_id" INTEGER NOT NULL,
    "number_of_hours" INTEGER NOT NULL,
    "attestation_type" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "Learning_plan_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Learning_plan" (
    "id" SERIAL NOT NULL,
    "speciality_id" INTEGER NOT NULL,
    "start_study_year" INTEGER NOT NULL,

    CONSTRAINT "Learning_plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "Specialities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learning_plan_content" ADD CONSTRAINT "Learning_plan_content_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "Disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learning_plan_content" ADD CONSTRAINT "Learning_plan_content_learning_plan_id_fkey" FOREIGN KEY ("learning_plan_id") REFERENCES "Learning_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learning_plan" ADD CONSTRAINT "Learning_plan_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "Specialities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
