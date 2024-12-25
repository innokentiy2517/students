/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Specialities` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_speciality_id_fkey";

-- DropForeignKey
ALTER TABLE "Learning_plan" DROP CONSTRAINT "Learning_plan_speciality_id_fkey";

-- DropForeignKey
ALTER TABLE "Learning_plan_content" DROP CONSTRAINT "Learning_plan_content_discipline_id_fkey";

-- DropForeignKey
ALTER TABLE "Learning_plan_content" DROP CONSTRAINT "Learning_plan_content_learning_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "Statements" DROP CONSTRAINT "Statements_discipline_id_fkey";

-- DropForeignKey
ALTER TABLE "Statements" DROP CONSTRAINT "Statements_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_group_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Specialities_name_key" ON "Specialities"("name");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "Specialities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statements" ADD CONSTRAINT "Statements_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statements" ADD CONSTRAINT "Statements_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "Disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learning_plan_content" ADD CONSTRAINT "Learning_plan_content_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "Disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learning_plan_content" ADD CONSTRAINT "Learning_plan_content_learning_plan_id_fkey" FOREIGN KEY ("learning_plan_id") REFERENCES "Learning_plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learning_plan" ADD CONSTRAINT "Learning_plan_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "Specialities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
