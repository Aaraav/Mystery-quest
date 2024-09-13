-- CreateTable
CREATE TABLE "Winner" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "solvedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Winner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
