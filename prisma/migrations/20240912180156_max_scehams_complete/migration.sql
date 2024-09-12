/*
  Warnings:

  - You are about to drop the `riddle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "riddle";

-- CreateTable
CREATE TABLE "Riddle" (
    "rid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "riddlecode" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Riddle_pkey" PRIMARY KEY ("rid")
);

-- CreateTable
CREATE TABLE "UserProgress" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "riddleId" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "lastSolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_teamId_riddleId_key" ON "UserProgress"("teamId", "riddleId");

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_riddleId_fkey" FOREIGN KEY ("riddleId") REFERENCES "Riddle"("rid") ON DELETE RESTRICT ON UPDATE CASCADE;
