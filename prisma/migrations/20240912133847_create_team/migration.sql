-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "teamid" TEXT NOT NULL,
    "teamname" TEXT NOT NULL,
    "teamlead" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" BIGINT NOT NULL,
    "password" TEXT NOT NULL,
    "teamscore" TEXT NOT NULL DEFAULT '0',
    "finishtime" TIMESTAMP(3),

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);
