/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_login_key" ON "Users"("login");
