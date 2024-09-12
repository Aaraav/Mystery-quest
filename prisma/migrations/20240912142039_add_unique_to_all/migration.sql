/*
  Warnings:

  - A unique constraint covering the columns `[teamname]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamlead]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobile]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Team_teamname_key" ON "Team"("teamname");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamlead_key" ON "Team"("teamlead");

-- CreateIndex
CREATE UNIQUE INDEX "Team_email_key" ON "Team"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Team_mobile_key" ON "Team"("mobile");
