/*
  Warnings:

  - You are about to alter the column `mobile` on the `Team` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "mobile" SET DATA TYPE INTEGER;
