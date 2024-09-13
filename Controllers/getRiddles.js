const prisma = require('../DB/db.config');

const getRiddles = async (req, res) => {
    try {
        const user = req.user;  
        console.log('user', user);

        const team = await prisma.team.findUnique({
            where: { teamname: user.teamname }
        });

        console.log('team', team);

        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        const existingProgress = await prisma.userProgress.count({
            where: { teamId: team.id }
        });

        if (existingProgress >= 6) {
            return res.status(400).json({ error: 'Team already has 6 riddles assigned' });
        }

        const riddlesNeeded = 6 - existingProgress;

        const randomRiddles = await prisma.$queryRaw`SELECT * FROM "Riddle" ORDER BY RANDOM() LIMIT ${riddlesNeeded}`;

        // Assign the selected random riddles to the team
        for (const riddle of randomRiddles) {
            await prisma.userProgress.upsert({
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
        }

        return res.json(randomRiddles);
    } catch (error) {
        console.error('Error retrieving riddles:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getRiddles;
