/*
  Warnings:

  - You are about to drop the column `finishtime` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "finishtime",
ADD COLUMN     "lastSolvedAt" TIMESTAMP(3);
