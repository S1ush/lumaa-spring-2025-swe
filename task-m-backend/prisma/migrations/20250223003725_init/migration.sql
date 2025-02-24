/*
  Warnings:

  - You are about to drop the column `hash` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "hash",
ADD COLUMN     "hashRT" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
