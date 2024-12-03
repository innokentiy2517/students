/*
  Warnings:

  - The `mark` column on the `Statements` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Statements" DROP COLUMN "mark",
ADD COLUMN     "mark" INTEGER;
