/*
  Warnings:

  - Added the required column `document_number` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "document_number" TEXT NOT NULL;
