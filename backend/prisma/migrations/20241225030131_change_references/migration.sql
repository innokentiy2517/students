/*
  Warnings:

  - You are about to drop the column `discipline_id` on the `Statements` table. All the data in the column will be lost.
  - Added the required column `learning_plan_content_id` to the `Statements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Statements" DROP CONSTRAINT "Statements_discipline_id_fkey";

-- AlterTable
ALTER TABLE "Statements" DROP COLUMN "discipline_id",
ADD COLUMN     "learning_plan_content_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Statements" ADD CONSTRAINT "Statements_learning_plan_content_id_fkey" FOREIGN KEY ("learning_plan_content_id") REFERENCES "Learning_plan_content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
