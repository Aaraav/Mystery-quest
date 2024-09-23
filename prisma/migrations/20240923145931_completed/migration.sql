-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "teamname" TEXT NOT NULL,
    "teamlead" TEXT NOT NULL,
    "teamlead_roll" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "teamscore" INTEGER NOT NULL DEFAULT 0,
    "lastSolvedAt" TIMESTAMP(3),

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamname_key" ON "Team"("teamname");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamlead_key" ON "Team"("teamlead");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamlead_roll_key" ON "Team"("teamlead_roll");

-- CreateIndex
CREATE UNIQUE INDEX "Team_email_key" ON "Team"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Team_mobile_key" ON "Team"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_teamId_riddleId_key" ON "UserProgress"("teamId", "riddleId");

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_riddleId_fkey" FOREIGN KEY ("riddleId") REFERENCES "Riddle"("rid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
