const prisma = require('../DB/db.config');
const {createClient}=require('redis');
// const client=createClient();

// client.on('error', (err) => console.log('Redis Client Error', err));


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

        const assignedriddles = await prisma.userProgress.findMany({
            where: { teamId: team.id },
            include: { riddle: true } 
        });

        if (existingProgress >= 6) {

            
            return res.status(200).json({ message: 'Team already has 6 riddles assigned' , riddles:assignedriddles});
        }

        // const cachedRiddles = await client.get(`team:${team.id}:riddles`);

        // if (cachedRiddles) {
        //     return res.json(JSON.parse(cachedRiddles));
        // }

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

        // await client.set(`team:${team.id}:riddles`, JSON.stringify(randomRiddles), 'EX', 3600);


        return res.json(randomRiddles);
    } catch (error) {
        console.error('Error retrieving riddles:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getRiddles;
