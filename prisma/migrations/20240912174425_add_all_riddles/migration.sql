-- CreateTable
CREATE TABLE "riddle" (
    "rid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "riddlecode" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "riddle_pkey" PRIMARY KEY ("rid")
);
