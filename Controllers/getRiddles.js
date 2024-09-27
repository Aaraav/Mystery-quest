const prisma = require('../DB/db.config');
// const { createClient } = require('redis');
// const client = createClient();

const getRiddles = async (req, res) => {
    try {
        const user = req.user;

        // Retrieve the team associated with the user
        const team = await prisma.team.findUnique({
            where: { teamname: user.teamname },
            select: { id: true } // Select only the id to reduce data size
        });

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        // Count existing progress for the team
        const existingProgress = await prisma.userProgress.count({
            where: { teamId: team.id },
        });

        // If the team has enough riddles assigned, return them
        if (existingProgress >= 8) {
            const assignedRiddles = await prisma.userProgress.findMany({
                where: { teamId: team.id },
                include: { riddle: true }
            });
            return res.json(assignedRiddles);
        }

        // Calculate how many more riddles are needed
        const riddlesNeeded = 8 - existingProgress;

        // Ensure there are enough riddles in the database
        const totalRiddles = await prisma.riddle.count();
        if (totalRiddles < riddlesNeeded) {
            return res.status(400).json({ error: 'Not enough riddles available' });
        }

        // Fetch random riddles
        const randomRiddles = await prisma.$queryRaw`SELECT * FROM "Riddle" ORDER BY RANDOM() LIMIT ${riddlesNeeded}`;

        // Prepare upsert operations for the selected riddles
        const upsertPromises = randomRiddles.map(riddle => {
            return prisma.userProgress.upsert({
                where: {
                    teamId_riddleId: {
                        teamId: team.id,
                        riddleId: riddle.rid
                    }
                },
                update: {
                    attempts: 0,
                    score: 0,
                    lastSolvedAt: null
                },
                create: {
                    teamId: team.id,
                    riddleId: riddle.rid,
                    attempts: 0,
                    score: 0,
                    lastSolvedAt: null
                }
            });
        });

        // Execute all upserts in a single transaction
        await prisma.$transaction(upsertPromises);

        // Optionally cache the riddles
        // await client.set(`team:${team.id}:riddles`, JSON.stringify(randomRiddles), 'EX', 3600);

        return res.json(randomRiddles);
    } catch (error) {
        console.error('Error retrieving riddles:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getRiddles;
